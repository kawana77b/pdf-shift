"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithRef, forwardRef, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "./Badge";
import { Image } from "./Image";
import { RemoveCircleButton } from "./RemoveCircleButton";

const slidePageVariants = cva("", {
  variants: {
    opacity: {
      default: "",
      "20": "bg-opacity-20 opacity-20",
      "30": "bg-opacity-30 opacity-30",
      "40": "bg-opacity-40 opacity-40",
    },
  },
  defaultVariants: {
    opacity: "default",
  },
});

export interface SlidePageProps
  extends ComponentPropsWithRef<"article">,
    VariantProps<typeof slidePageVariants> {
  className?: string;
  src: string;
  alt: string;
  /**
   * Indicates slide number
   */
  no: number;
  isSelected?: boolean;
  disableRemove?: boolean;
  /**
   * Event handler for Remove Button click
   */
  onRemoveClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

/**
 * Slide component to be displayed in the collection view of the slide page.
 */
export const SlidePage = forwardRef<HTMLElement, SlidePageProps>(
  (
    {
      id,
      className,
      src,
      alt,
      no,
      isSelected,
      opacity,
      disableRemove,
      onClick,
      onRemoveClick,
      ...props
    }: SlidePageProps,
    ref
  ) => {
    return (
      <article
        id={id}
        ref={ref}
        className={cn(
          "p-2  rounded-xl",
          "group",
          isSelected && "bg-sky-400  shadow-xl",
          slidePageVariants({ opacity }),
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="relative my-1">
          <Image src={src} alt={alt} />
          <RemoveCircleButton
            className="absolute top-[-0.2rem] right-[-0.2rem]"
            onClick={onRemoveClick}
            disabled={disableRemove}
            groupHover
          />
        </div>
        <div className="flex justify-center items-center" aria-hidden="true">
          <Badge no={no} isSelected={isSelected} />
        </div>
      </article>
    );
  }
);

SlidePage.displayName = "SlidePage";
