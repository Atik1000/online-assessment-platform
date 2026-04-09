type CandidateExamPageProps = {
  params: { id: string };
};

export default function CandidateExamPage({ params }: CandidateExamPageProps) {
  return <div className="p-6">Exam {params.id}</div>;
}
