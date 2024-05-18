"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type ImageProps = ComponentPropsWithoutRef<"img">

export const Image = ({ className, src, alt, ...props }: ImageProps) => {
  return (
    <picture>
      <img
        className={cn("rounded-md border-[1px] shadow-md", className)}
        src={src}
        alt={alt}
        {...props}
      />
    </picture>
  );
};
