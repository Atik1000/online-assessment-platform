import type { CandidateExamRecord, Exam } from "@/types/exam";

export const mockDb: { exams: Exam[]; candidates: CandidateExamRecord[] } = {
  exams: [
    {
      id: "exam-1",
      title: "Frontend Fundamentals",
      totalCandidates: 40,
      totalSlots: 2,
      questionSets: 3,
      questionType: "radio",
      startTime: "2026-04-11T09:00:00.000Z",
      endTime: "2026-04-11T11:00:00.000Z",
      duration: 60,
      negativeMarking: true,
      questions: [
        {
          id: "q-1",
          questionTitle: "What does JSX compile to?",
          type: "radio",
          options: ["Functions", "Objects", "HTML", "JS classes"],
        },
      ],
    },
  ],
  candidates: [
    {
      id: "cand-1",
      testId: "exam-1",
      candidateName: "Alex Doe",
      email: "alex@example.com",
      status: "completed",
    },
    {
      id: "cand-2",
      testId: "exam-1",
      candidateName: "Sam Lee",
      email: "sam@example.com",
      status: "pending",
    },
  ],
};
