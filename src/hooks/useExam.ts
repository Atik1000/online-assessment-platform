"use client";

import { useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getExamById, submitExam } from "@/services/exam.service";
import { useExamSessionStore } from "@/store/exam-session-store";
import type { QuestionType } from "@/types/exam";

export function useExam(examId: string) {
  const queryClient = useQueryClient();
  const session = useExamSessionStore();

  const examQuery = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => getExamById(examId),
  });

  const submitMutation = useMutation({
    mutationFn: submitExam,
    onSuccess: async () => {
      session.markSubmitted();
      await queryClient.invalidateQueries({ queryKey: ["exam", examId] });
    },
  });

  const setAnswer = useCallback(
    (questionId: string, type: QuestionType, value: string | string[]) => {
      session.setAnswer({ questionId, type, value });
    },
    [session],
  );

  const submitCurrentExam = useCallback(async () => {
    if (!examQuery.data) return;

    await submitMutation.mutateAsync({
      examId,
      answers: Object.values(session.answers),
      violations: session.violations,
      submittedAt: new Date().toISOString(),
    });
  }, [examId, examQuery.data, session.answers, session.violations, submitMutation]);

  return useMemo(
    () => ({
      exam: examQuery.data,
      isLoading: examQuery.isLoading,
      isError: examQuery.isError,
      answers: session.answers,
      violations: session.violations,
      submitted: session.submitted,
      startExam: session.startExam,
      setAnswer,
      incrementViolation: session.incrementViolation,
      submitCurrentExam,
      submitPending: submitMutation.isPending,
      clearSession: session.clearSession,
    }),
    [
      examQuery.data,
      examQuery.isLoading,
      examQuery.isError,
      session.answers,
      session.violations,
      session.submitted,
      session.startExam,
      session.incrementViolation,
      session.clearSession,
      setAnswer,
      submitCurrentExam,
      submitMutation.isPending,
    ],
  );
}
