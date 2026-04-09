import { CandidateList } from "@/features/employer/components/candidate-list";

type EmployerCandidatesPageProps = {
  params: { testId: string };
};

export default function EmployerCandidatesPage({ params }: EmployerCandidatesPageProps) {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Candidates for test {params.testId}</h1>
      <CandidateList testId={params.testId} />
    </main>
  );
}
