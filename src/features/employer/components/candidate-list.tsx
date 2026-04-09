"use client";

import { useQuery } from "@tanstack/react-query";

import { getCandidatesByTestId } from "@/services/exam.service";

type CandidateListProps = {
  testId: string;
};

export function CandidateList({ testId }: CandidateListProps) {
  const candidatesQuery = useQuery({
    queryKey: ["candidates", testId],
    queryFn: () => getCandidatesByTestId(testId),
  });

  if (candidatesQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading candidates...</p>;
  }

  if (candidatesQuery.error) {
    return <p className="text-sm text-destructive">Unable to load candidates.</p>;
  }

  if (!candidatesQuery.data || candidatesQuery.data.length === 0) {
    return <p className="text-sm text-muted-foreground">No candidates assigned to this test.</p>;
  }

  return (
    <div className="space-y-3">
      {candidatesQuery.data.map((candidate) => (
        <div key={candidate.id} className="rounded-xl border p-3">
          <p className="font-medium">{candidate.candidateName}</p>
          <p className="text-sm text-muted-foreground">{candidate.email}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{candidate.status}</p>
        </div>
      ))}
    </div>
  );
}
