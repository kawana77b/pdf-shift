"use client";

import { Dropzone } from "@/components/Dropzone";
import { PDFIcon } from "@/components/icons";
import { usePdfFile } from "@/hooks/usePdfFile";
import { cn } from "@/lib/utils";

/**
 * Large panel display that acts as a PDF drop zone
 */
export const PleaseDropPdf = () => {
  const { openFileDialog, setOpenFile } = usePdfFile();
  return (
    <Dropzone
      onDrop={async ([file]) => {
        setOpenFile(file.path);
      }}
      onClick={openFileDialog}
      render={({ isActive }) => {
        return (
          <div
            className={cn(
              "flex flex-col justify-center items-center h-full gap-4",
              isActive && "bg-sky-200"
            )}
          >
            <PDFIcon size={220} />
            <p>Please drop a PDF file here or click here.</p>
          </div>
        );
      }}
    />
  );
};
