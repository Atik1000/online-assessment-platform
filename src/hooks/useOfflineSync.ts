"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { submitExam } from "@/services/exam.service";
import {
  getPendingSubmissions,
  removePendingSubmission,
  savePendingSubmission,
} from "@/services/offline-exam-db";
import type { SubmitExamInput } from "@/types/exam";

export function useOfflineSync() {
  const [isOffline, setIsOffline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const refreshPendingCount = useCallback(async () => {
    const pending = await getPendingSubmissions();
    setPendingCount(pending.length);
  }, []);

  const syncPending = useCallback(async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return;
    }

    const pending = await getPendingSubmissions();
    if (pending.length === 0) return;

    for (const item of pending) {
      try {
        await submitExam(item);
        await removePendingSubmission(item.id);
      } catch {
        break;
      }
    }

    await refreshPendingCount();
  }, [refreshPendingCount]);

  const submitWithOfflineSupport = useCallback(
    async (payload: SubmitExamInput) => {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        await savePendingSubmission(payload);
        await refreshPendingCount();
        toast.warning("You are offline. Submission queued and will auto-sync.");
        return { queued: true } as const;
      }

      await submitExam(payload);
      await syncPending();
      return { queued: false } as const;
    },
    [refreshPendingCount, syncPending],
  );

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = async () => {
      setIsOffline(false);
      await syncPending();
      toast.success("Back online. Sync completed.");
    };

    setIsOffline(typeof navigator !== "undefined" ? !navigator.onLine : false);
    refreshPendingCount();

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [refreshPendingCount, syncPending]);

  return useMemo(
    () => ({
      isOffline,
      pendingCount,
      submitWithOfflineSupport,
      syncPending,
    }),
    [isOffline, pendingCount, submitWithOfflineSupport, syncPending],
  );
}
