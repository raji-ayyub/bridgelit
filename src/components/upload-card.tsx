import { Camera, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadCardProps {
  label: string;
  hint?: string;
  onCapture?: () => void;
  onBrowse?: () => void;
}

/** Dashed dropzone for "take a clear photo of any document". */
export function UploadCard({ label, hint, onCapture, onBrowse }: UploadCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <FileText className="h-8 w-8 text-slate-300" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      </div>
      <div className="flex gap-2">
        {onCapture && (
          <Button variant="secondary" size="icon" onClick={onCapture} aria-label="Take photo">
            <Camera className="h-4 w-4" />
          </Button>
        )}
        {onBrowse && (
          <Button variant="outline" size="sm" onClick={onBrowse}>
            <ImageIcon className="mr-1.5 h-4 w-4" /> Gallery
          </Button>
        )}
      </div>
    </div>
  );
}
