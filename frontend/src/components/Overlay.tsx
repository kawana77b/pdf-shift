import { type ReactNode } from "react";

import { Spinner } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Overlay with glass-like transparency
 */
export const Overlay = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full bg-gray-200 bg-opacity-20 backdrop-blur-sm shadow-lg z-[999]",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Overlay to indicate if the user should wait
 */
export const PleaseWaitOverlay = ({
  className,
  absolute,
  message = "Please Wait...",
  visible = true,
}: {
  className?: string;
  absolute?: boolean;
  message?: string;
  visible?: boolean;
}) => {
  if (!visible) return null;
  return (
    <Overlay className={cn(absolute && "absolute top-0 left-0", className)}>
      <div className="h-full w-full flex flex-col justify-center items-center gap-3">
        <Spinner width={100} height={100} color="#0096FF" />
        <p className="bg-white bg-opacity-20 rounded-2xl p-2 text-xl font-bold text-black">
          {message}
        </p>
      </div>
    </Overlay>
  );
};
