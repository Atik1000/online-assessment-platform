"use client";

import { useEffect } from "react";

type UseCheatingDetectionProps = {
  onViolation: (reason: string) => void;
};

export function useCheatingDetection({ onViolation }: UseCheatingDetectionProps) {
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        onViolation("Tab switch detected");
      }
    };

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onViolation("Fullscreen exit detected");
      }
    };

    const onCopyPaste = (event: ClipboardEvent) => {
      event.preventDefault();
      onViolation("Copy/Paste action blocked");
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("copy", onCopyPaste);
    document.addEventListener("paste", onCopyPaste);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("copy", onCopyPaste);
      document.removeEventListener("paste", onCopyPaste);
    };
  }, [onViolation]);
}
