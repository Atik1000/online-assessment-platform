"use client";

import { create } from "zustand";

import type { ExamQuestion } from "@/types/exam";

type CreateTestState = {
  questions: ExamQuestion[];
  setQuestions: (questions: ExamQuestion[]) => void;
  addQuestion: (question: Omit<ExamQuestion, "id">) => void;
  updateQuestion: (id: string, question: Omit<ExamQuestion, "id">) => void;
  deleteQuestion: (id: string) => void;
  clear: () => void;
};

export const useCreateTestStore = create<CreateTestState>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
  addQuestion: (question) =>
    set((state) => ({
      questions: [...state.questions, { id: `question-${Date.now()}`, ...question }],
    })),
  updateQuestion: (id, question) =>
    set((state) => ({
      questions: state.questions.map((item) => (item.id === id ? { id, ...question } : item)),
    })),
  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((item) => item.id !== id),
    })),
  clear: () => set({ questions: [] }),
}));
