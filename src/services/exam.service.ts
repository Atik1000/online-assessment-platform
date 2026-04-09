import { mockDb } from "@/services/mock-db";
import type { CandidateExamRecord, Exam } from "@/types/exam";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type CreateExamInput = Omit<Exam, "id">;

export async function getExams(): Promise<Exam[]> {
  await sleep(250);
  return structuredClone(mockDb.exams);
}

export async function createExam(payload: CreateExamInput): Promise<Exam> {
  await sleep(350);
  const created: Exam = {
    id: `exam-${Date.now()}`,
    ...payload,
  };
  mockDb.exams.unshift(created);
  return structuredClone(created);
}

export async function getCandidatesByTestId(testId: string): Promise<CandidateExamRecord[]> {
  await sleep(220);
  return structuredClone(mockDb.candidates.filter((candidate) => candidate.testId === testId));
}
