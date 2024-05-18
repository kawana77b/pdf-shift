"use client";

import { type DragEvent, forwardRef, type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

export interface DropzoneProps {
  className?: string;
  render?: (state: { isActive: boolean }) => ReactNode;
  onDrop?: (files: File[]) => void;
  onClick?: () => void;
}

/**
 * Standard drop zone.
 * - `render` attribute to draw appearance
 * - `onDrop` and `onClick` to supplement events
 */
export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, onDrop, onClick, render, ...props }: DropzoneProps, ref) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.dropEffect = "copy";

      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      setIsActive(false);

      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files) {
        const files = [...e.dataTransfer.files];
        onDrop?.(files);
      }
    };

    const handleDragEnter = (_: DragEvent<HTMLDivElement>) => {
      setIsActive(true);
    };

    const handleDragLeave = (_: DragEvent<HTMLDivElement>) => {
      setIsActive(false);
    };

    return (
      <div ref={ref} className={cn("relative h-full w-full", className)}>
        {render && render({ isActive: isActive })}
        <div
          className={cn(
            "z-[500] h-full w-full absolute top-0 left-0",
            "cursor-pointer"
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={onClick}
          {...props}
        ></div>
      </div>
    );
  }
);

Dropzone.displayName = "AppDropzone";
