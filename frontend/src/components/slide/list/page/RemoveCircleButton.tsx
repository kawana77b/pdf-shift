"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";

import { CrossIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface RemoveCircleButtonProps
  extends ComponentPropsWithRef<"button"> {
  size?: number;
  shadow?: boolean;
  /**
   * Determines whether `visible` is turned on when the parent element hover in response to a specified parent element with a tailwind `group`.
   */
  groupHover?: boolean;
}

export const RemoveCircleButton = forwardRef<
  HTMLButtonElement,
  RemoveCircleButtonProps
>(({ className, size, shadow = true, disabled, groupHover, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        " bg-red-500 rounded-full transition-opacity duration-700",
        "hover:opacity-100",
        !groupHover && "opacity-60",
        groupHover &&
          "invisible opacity-0 group-hover:visible group-hover:opacity-100",
        shadow && "shadow-xl",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <CrossIcon size={size ?? 24} fill="#FFFFFF" />
    </button>
  );
});

RemoveCircleButton.displayName = "DeleteCircleButton";
