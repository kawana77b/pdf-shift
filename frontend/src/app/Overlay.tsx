"use client";

import { PleaseWaitOverlay } from "@/components/Overlay";
import { usePleaseWaitState } from "@/states/PleaseWaitState";

export const Overlay = () => {
  const { isWaiting } = usePleaseWaitState();

  return <PleaseWaitOverlay visible={isWaiting} absolute />;
};
