"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { QuestionType } from "@/types/exam";

export type ExamAnswer = {
  questionId: string;
  type: QuestionType;
  value: string | string[];
};

type ExamSessionState = {
  activeExamId: string | null;
  answers: Record<string, ExamAnswer>;
  violations: number;
  submitted: boolean;
  startExam: (examId: string) => void;
  setAnswer: (answer: ExamAnswer) => void;
  incrementViolation: () => void;
  markSubmitted: () => void;
  clearSession: () => void;
};

const initialState = {
  activeExamId: null,
  answers: {},
  violations: 0,
  submitted: false,
};

export const useExamSessionStore = create<ExamSessionState>()(
  persist(
    (set, get) => ({
      ...initialState,
      startExam: (examId) => {
        const { activeExamId, submitted } = get();
        if (activeExamId !== examId || submitted) {
          set({ ...initialState, activeExamId: examId });
        }
      },
      setAnswer: (answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [answer.questionId]: answer,
          },
        })),
      incrementViolation: () => set((state) => ({ violations: state.violations + 1 })),
      markSubmitted: () => set({ submitted: true }),
      clearSession: () => set(initialState),
    }),
    {
      name: "oas-exam-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeExamId: state.activeExamId,
        answers: state.answers,
        violations: state.violations,
        submitted: state.submitted,
      }),
    },
  ),
);
