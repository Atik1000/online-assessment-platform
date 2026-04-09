"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { AppButton } from "@/components/shared/app-button";
import { AppCard } from "@/components/shared/app-card";
import { getExams } from "@/services/exam.service";

export function CandidateDashboard() {
  const examsQuery = useQuery({
    queryKey: ["exams"],
    queryFn: getExams,
  });

  if (examsQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading available exams...</p>;
  }

  if (examsQuery.isError) {
    return <p className="text-sm text-destructive">Failed to load exams.</p>;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {examsQuery.data?.map((exam) => (
        <AppCard
          key={exam.id}
          title={exam.title}
          description={`Duration ${exam.duration} mins • Total questions ${exam.questions.length}`}
        >
          <p className="text-sm text-muted-foreground">
            Negative marking: {exam.negativeMarking ? "Enabled" : "Disabled"}
          </p>
          <Link className="mt-4 block" href={`/candidate/exam/${exam.id}`}>
            <AppButton className="w-full">Start</AppButton>
          </Link>
        </AppCard>
      ))}
    </section>
  );
}
