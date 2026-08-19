"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, FileText, Loader2, Play, RotateCcw, Upload, X } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { extractTextFromFile, prepareSpeechText } from "@/lib/document-text";

export default function ReadingDocumentPage() {
  const router = useRouter();
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState("");
  const [status, setStatus] = useState("Upload a PDF or scan an image to begin.");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const speechQueueRef = useRef<string[]>([]);
  const speechIndexRef = useRef(0);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !cameraStream) {
      return;
    }

    video.srcObject = cameraStream;

    const handleLoadedMetadata = () => {
      setIsCameraReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.play().catch(() => {
      setCameraError("Your browser blocked live camera preview. You can still try capturing.");
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [cameraStream]);

  useEffect(() => {
    if (!isScannerOpen) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsCameraReady(false);
      setIsCameraStarting(false);
      return;
    }

    let cancelled = false;

    async function startCamera() {
      setCameraError(null);
      setIsCameraStarting(true);

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Your browser does not support the camera scanner.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        setCameraStream(stream);

      } catch (err) {
        setCameraError(err instanceof Error ? err.message : "Could not open the camera.");
      } finally {
        if (!cancelled) {
          setIsCameraStarting(false);
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
    };
  }, [isScannerOpen]);

  function openScanner() {
    setIsScannerOpen(true);
  }

  function openPdfPicker() {
    pdfInputRef.current?.click();
  }

  function resetDocument() {
    setDocumentName(null);
    setDocumentText("");
    setError(null);
    setStatus("Upload a PDF or scan an image to begin.");
    setIsSpeaking(false);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    speechQueueRef.current = [];
    speechIndexRef.current = 0;
  }

  function closeScanner() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraStream(null);
    setIsScannerOpen(false);
    setCameraError(null);
    setIsCameraReady(false);
    setIsCameraStarting(false);
  }

  async function handlePdfChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setDocumentName(file.name);
    setDocumentText("");
    setStatus("Reading your document...");

    try {
      const text = await extractTextFromFile(file, setStatus);
      if (!text) {
        throw new Error("No readable text was found in that file.");
      }

      setDocumentText(text);
      setStatus("Ready to read.");
    } catch (err) {
      setDocumentName(null);
      setDocumentText("");
      setStatus("Upload a PDF or scan an image to begin.");
      setError(err instanceof Error ? err.message : "Something went wrong while reading the file.");
    } finally {
      setIsLoading(false);
    }
  }

  async function captureScan() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      setCameraError("The camera is not ready yet.");
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Canvas is not available in this browser.");
      return;
    }

    context.drawImage(video, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));

    if (!blob) {
      setCameraError("Could not capture the photo.");
      return;
    }

    closeScanner();

    const capturedFile = new File([blob], `scan-${Date.now()}.jpg`, { type: "image/jpeg" });
    setIsLoading(true);
    setError(null);
    setDocumentName(capturedFile.name);
    setDocumentText("");
    setStatus("Reading your scan...");

    try {
      const text = await extractTextFromFile(capturedFile, setStatus);
      if (!text) {
        throw new Error("No readable text was found in that scan.");
      }

      setDocumentText(text);
      setStatus("Ready to read.");
    } catch (err) {
      setDocumentName(null);
      setDocumentText("");
      setStatus("Upload a PDF or scan an image to begin.");
      setError(err instanceof Error ? err.message : "Something went wrong while reading the scan.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSpeak() {
    if (!documentText || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const chunks = prepareSpeechText(documentText);
    if (chunks.length === 0) {
      return;
    }

    speechQueueRef.current = chunks;
    speechIndexRef.current = 0;
    setIsSpeaking(true);

    const speakNext = () => {
      const nextChunk = speechQueueRef.current[speechIndexRef.current];

      if (!nextChunk) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(nextChunk);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.lang = "en-US";
      utterance.onend = () => {
        speechIndexRef.current += 1;
        window.setTimeout(speakNext, 180);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }

  return (
    <>
      <AppHeader title="Reading Document" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <input
          ref={pdfInputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={handlePdfChange}
        />

        <Card className="mt-2 p-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#f4eee3] p-4 shadow-inner">
            {isLoading ? (
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-md bg-white p-6 text-center shadow-md">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                <p className="mt-4 text-sm font-medium text-slate-900">Reading document</p>
                <p className="mt-1 text-xs text-slate-500">{status}</p>
              </div>
            ) : documentText ? (
              <div className="mx-auto flex min-h-[240px] max-w-[480px] flex-col rounded-md bg-white p-4 text-slate-700 shadow-md">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900">Ready to read</p>
                    <p className="mt-1 text-xs text-slate-500">{documentName}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 max-h-[45vh] overflow-y-auto whitespace-pre-wrap text-[14px] leading-6 text-slate-700">
                  {documentText}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-md bg-white p-6 text-center shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Upload className="h-7 w-7" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-900">Upload a PDF or scan an image</p>
                <p className="mt-1 max-w-[240px] text-xs leading-5 text-slate-500">
                  Scan a paper with your camera or upload a PDF to turn it into text.
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button variant="secondary" onClick={openScanner}>
                    <Camera className="h-4 w-4" />
                    Scan Photo
                  </Button>
                  <Button variant="outline" onClick={openPdfPicker}>
                    <Upload className="h-4 w-4" />
                    Upload PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {!error && <p className="mt-3 text-sm text-slate-500">{status}</p>}
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={resetDocument}>
            <RotateCcw className="h-4 w-4" />
            Retake
          </Button>
          <Button variant="secondary" onClick={handleSpeak} disabled={!documentText || isLoading}>
            <Play className="h-4 w-4" />
            {isSpeaking ? "Reading" : "Read Aloud"}
          </Button>
        </div>
      </main>

      {isScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full overflow-hidden rounded-[28px] bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
              <div>
                <p className="text-sm font-medium">Scan document</p>
                <p className="text-xs text-white/60">
                  {isCameraStarting ? "Opening camera..." : "Position the page inside the frame"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeScanner}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Close scanner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative bg-black">
              <video
                ref={videoRef}
                className="h-[52vh] w-full object-contain bg-black"
                playsInline
                muted
                autoPlay
              />
              <div className="pointer-events-none absolute inset-4 rounded-[24px] border-2 border-dashed border-white/80" />
              {!cameraStream && !cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-white">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-sm">{isCameraStarting ? "Starting camera..." : "Preparing scanner..."}</p>
                  </div>
                </div>
              )}
              {cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 px-6 text-center text-white">
                  <div className="max-w-sm">
                    <p className="text-sm font-medium">Camera unavailable</p>
                    <p className="mt-2 text-xs leading-5 text-white/70">{cameraError}</p>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="grid grid-cols-2 gap-3 px-4 py-4">
              <Button variant="outline" onClick={closeScanner} className="bg-white">
                Cancel
              </Button>
              <Button variant="secondary" onClick={captureScan} disabled={!isCameraReady || isLoading}>
                <Camera className="h-4 w-4" />
                Capture
              </Button>
            </div>
          </div>
        </div>
      )}

      <AppShellNav active="home" />
    </>
  );
}
