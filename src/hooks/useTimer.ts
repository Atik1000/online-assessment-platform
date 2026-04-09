"use client";

import { useEffect, useMemo, useState } from "react";

export function useTimer(durationMinutes: number, onExpire: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    setSecondsLeft(durationMinutes * 60);
  }, [durationMinutes]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }

    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [secondsLeft, onExpire]);

  return useMemo(
    () => ({
      secondsLeft,
      isExpired: secondsLeft <= 0,
    }),
    [secondsLeft],
  );
}
