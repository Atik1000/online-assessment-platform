"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CircleX, Clock3, FileText, Search } from "lucide-react";

import { AppButton } from "@/components/shared/app-button";
import { getExams } from "@/services/exam.service";

export function CandidateDashboard() {
  const [search, setSearch] = useState("");
  const examsQuery = useQuery({
    queryKey: ["exams"],
    queryFn: getExams,
  });

  const filteredExams = useMemo(() => {
    if (!examsQuery.data) return [];
    const term = search.trim().toLowerCase();
    if (!term) return examsQuery.data;

    return examsQuery.data.filter((exam) => exam.title.toLowerCase().includes(term));
  }, [examsQuery.data, search]);

  if (examsQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading available exams...</p>;
  }

  if (examsQuery.isError) {
    return <p className="text-sm text-destructive">Failed to load exams.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-700">Online Tests</h2>

        <label className="relative block w-full max-w-140">
          <input
            className="h-11 w-full rounded-xl border border-violet-300/70 bg-white pl-4 pr-12 text-sm text-slate-700 shadow-[0_5px_18px_rgba(124,58,237,0.12)] outline-none placeholder:text-slate-400 focus:border-violet-400"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by exam title"
            value={search}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <Search className="size-4" />
          </span>
        </label>
      </div>

      {filteredExams.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
          No tests matched your search.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredExams.map((exam) => (
            <article key={exam.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.03)]">
              <h3 className="text-[34px] font-semibold leading-tight text-slate-700">{exam.title}</h3>

              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-base text-slate-500">
                <p className="inline-flex items-center gap-2">
                  <Clock3 className="size-4" />
                  Duration:
                  <span className="font-semibold text-slate-600">{exam.duration} min</span>
                </p>
                <p className="inline-flex items-center gap-2">
                  <FileText className="size-4" />
                  Question:
                  <span className="font-semibold text-slate-600">{exam.questions.length}</span>
                </p>
                <p className="inline-flex items-center gap-2">
                  <CircleX className="size-4" />
                  Negative Marking:
                  <span className="font-semibold text-slate-600">{exam.negativeMarking ? "-0.25/wrong" : "0"}</span>
                </p>
              </div>

              <Link className="mt-6 inline-block" href={`/candidate/exam/${exam.id}`}>
                <AppButton
                  className="h-10 min-w-28 rounded-xl border-violet-500 bg-white px-8 text-base font-semibold text-violet-600 hover:bg-violet-50"
                  variant="outline"
                >
                  Start
                </AppButton>
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white">‹</button>
          <span className="min-w-7 text-center font-semibold text-slate-700">1</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white">›</button>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>Online Test Per Page</span>
          <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-slate-700">
            8
            <span className="text-xs">⌃</span>
          </button>
        </div>
      </div>
    </section>
  );
}
