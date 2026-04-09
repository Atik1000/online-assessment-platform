type EmployerCandidatesPageProps = {
  params: { testId: string };
};

export default function EmployerCandidatesPage({ params }: EmployerCandidatesPageProps) {
  return <div className="p-6">Candidates for test {params.testId}</div>;
}
