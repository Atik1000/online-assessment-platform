import { ExamEngine } from "@/features/exam/components/exam-engine";

type CandidateExamPageProps = {
  params: { id: string };
};

export default function CandidateExamPage({ params }: CandidateExamPageProps) {
  return <ExamEngine examId={params.id} />;
}
