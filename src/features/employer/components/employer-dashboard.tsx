"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { AppCard } from "@/components/shared/app-card";
import { AppButton } from "@/components/shared/app-button";
import { getExams } from "@/services/exam.service";

export function EmployerDashboard() {
  const examsQuery = useQuery({
    queryKey: ["exams"],
    queryFn: getExams,
  });

  if (examsQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading exams...</p>;
  }

  if (examsQuery.error) {
    return <p className="text-sm text-destructive">Failed to load exams.</p>;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {examsQuery.data?.map((exam) => (
        <AppCard
          key={exam.id}
          title={exam.title}
          description={`Duration ${exam.duration} mins • ${exam.questions.length} questions`}
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Candidates: {exam.totalCandidates}</p>
            <p>Question Sets: {exam.questionSets}</p>
            <p>Exam Slots: {exam.totalSlots}</p>
          </div>
          <Link className="mt-4 block" href={`/employer/candidates/${exam.id}`}>
            <AppButton className="w-full" variant="outline">
              View Candidates
            </AppButton>
          </Link>
        </AppCard>
      ))}
    </section>
  );
}
