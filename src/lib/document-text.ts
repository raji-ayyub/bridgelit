type ProgressReporter = (message: string) => void;

type PdfDocument = import("pdfjs-dist").PDFDocumentProxy;

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function normalizeText(text: string) {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export async function extractTextFromFile(file: File, report: ProgressReporter = () => {}) {
  if (isPdf(file)) {
    return extractTextFromPdf(file, report);
  }

  if (file.type.startsWith("image/")) {
    return extractTextFromImage(file, report);
  }

  throw new Error("Please upload a PDF or image file.");
}

async function extractTextFromPdf(file: File, report: ProgressReporter) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).toString();

  report("Loading PDF...");

  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const textPages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    report(`Reading page ${pageNumber} of ${pdf.numPages}...`);
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: unknown) => (typeof item === "object" && item !== null && "str" in item ? String((item as { str?: string }).str ?? "") : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (pageText) {
      textPages.push(pageText);
    }
  }

  const extractedText = normalizeText(textPages.join("\n\n"));

  if (extractedText) {
    return extractedText;
  }

  report("No text layer found. Scanning PDF pages...");
  return extractTextFromPdfImages(pdf, report);
}

async function extractTextFromPdfImages(pdf: PdfDocument, report: ProgressReporter) {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng", undefined, {
    logger(message) {
      if (message.status === "recognizing text") {
        report(`Scanning page image... ${Math.round(message.progress * 100)}%`);
        return;
      }

      if (message.status === "loading tesseract core") {
        report("Loading OCR engine...");
        return;
      }

      if (message.status === "loading language traineddata") {
        report("Loading OCR language data...");
        return;
      }

      if (message.status === "initializing api") {
        report("Preparing OCR...");
      }
    },
  });

  try {
    const pageTexts: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      report(`Scanning page ${pageNumber} of ${pdf.numPages}...`);
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is not available in this browser.");
      }

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      await page.render({ canvasContext: context, canvas, viewport }).promise;
      const result = await worker.recognize(canvas);
      const pageText = normalizeText(result.data.text);

      if (pageText) {
        pageTexts.push(pageText);
      }
    }

    return normalizeText(pageTexts.join("\n\n"));
  } finally {
    await worker.terminate();
  }
}

async function extractTextFromImage(file: File, report: ProgressReporter) {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng", undefined, {
    logger(message) {
      if (message.status === "recognizing text") {
        report(`Scanning image... ${Math.round(message.progress * 100)}%`);
        return;
      }

      if (message.status === "loading tesseract core") {
        report("Loading OCR engine...");
        return;
      }

      if (message.status === "loading language traineddata") {
        report("Loading OCR language data...");
        return;
      }

      if (message.status === "initializing api") {
        report("Preparing OCR...");
      }
    },
  });

  try {
    const result = await worker.recognize(file);
    return normalizeText(result.data.text);
  } finally {
    await worker.terminate();
  }
}
