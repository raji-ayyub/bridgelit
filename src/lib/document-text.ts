type ProgressReporter = (message: string) => void;

type PdfDocument = import("pdfjs-dist").PDFDocumentProxy;

type PdfTextItem = {
  str?: string;
  hasEOL?: boolean;
};

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function normalizeWhitespace(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanOcrLine(line: string) {
  const normalized = line
    .replace(/[|]/g, "I")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2022\u00b7]/g, " ")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .replace(/[^\S\n]+/g, " ")
    .trim();

  if (!normalized) {
    return "";
  }

  if (/^[^A-Za-z0-9]+$/.test(normalized)) {
    return "";
  }

  return normalized;
}

function cleanOcrText(text: string) {
  const lines = text
    .replace(/\f/g, "\n")
    .split("\n")
    .map((line) => cleanOcrLine(line))
    .filter(Boolean);

  const mergedLines: string[] = [];

  for (const line of lines) {
    const previous = mergedLines[mergedLines.length - 1];
    if (previous && previous.endsWith("-")) {
      mergedLines[mergedLines.length - 1] = `${previous.slice(0, -1)}${line}`;
      continue;
    }

    mergedLines.push(line);
  }

  return normalizeWhitespace(mergedLines.join("\n"));
}

function buildPdfLines(items: PdfTextItem[]) {
  const lines: string[] = [];
  let currentLine: string[] = [];

  for (const item of items) {
    const value = item.str?.trim();
    if (value) {
      const previous = currentLine[currentLine.length - 1];
      if (previous && previous.endsWith("-")) {
        currentLine[currentLine.length - 1] = `${previous.slice(0, -1)}${value}`;
      } else {
        currentLine.push(value);
      }
    }

    if (item.hasEOL) {
      const line = normalizeWhitespace(currentLine.join(" "));
      if (line) {
        lines.push(line);
      }
      currentLine = [];
    }
  }

  const tail = normalizeWhitespace(currentLine.join(" "));
  if (tail) {
    lines.push(tail);
  }

  return lines;
}

function formatSpeechText(text: string) {
  return normalizeWhitespace(text);
}

function splitSpeechChunk(chunk: string) {
  return chunk
    .split(/\n+/)
    .flatMap((line) =>
      line
        .split(/(?<=[.!?])\s+/)
        .map((part) => part.trim())
        .filter(Boolean)
    );
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
    const pageItems = textContent.items as PdfTextItem[];
    const pageLines = buildPdfLines(pageItems);

    if (pageLines.length > 0) {
      textPages.push(pageLines.join("\n"));
    }
  }

  const extractedText = normalizeWhitespace(textPages.join("\n\n"));

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
      const pageText = cleanOcrText(result.data.text);

      if (pageText) {
        pageTexts.push(pageText);
      }
    }

    return normalizeWhitespace(pageTexts.join("\n\n"));
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
    return cleanOcrText(result.data.text);
  } finally {
    await worker.terminate();
  }
}

export function prepareSpeechText(text: string) {
  const cleaned = formatSpeechText(text);
  if (!cleaned) {
    return [];
  }

  return cleaned
    .split(/\n{2,}/)
    .flatMap((part) => splitSpeechChunk(part))
    .filter(Boolean);
}
