export type QuestionType = "checkbox" | "radio" | "text";

export type ExamQuestion = {
  id: string;
  questionTitle: string;
  type: QuestionType;
  options?: string[];
};

export type Exam = {
  id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  questionSets: number;
  questionType: QuestionType;
  startTime: string;
  endTime: string;
  duration: number;
  questions: ExamQuestion[];
  negativeMarking: boolean;
};

export type CandidateExamRecord = {
  id: string;
  testId: string;
  candidateName: string;
  email: string;
  status: "pending" | "completed";
};
