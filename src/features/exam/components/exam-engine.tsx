"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppButton } from "@/components/shared/app-button";
import { Timer } from "@/components/shared/timer";
import { useCheatingDetection } from "@/hooks/useCheatingDetection";
import { useExam } from "@/hooks/useExam";
import { useTimer } from "@/hooks/useTimer";

type ExamEngineProps = {
  examId: string;
};

export function ExamEngine({ examId }: ExamEngineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const examState = useExam(examId);

  useEffect(() => {
    examState.startExam(examId);
  }, [examId, examState]);

  const onSubmit = useCallback(async () => {
    if (examState.submitted || examState.submitPending) return;
    await examState.submitCurrentExam();
    toast.success("Exam submitted");
  }, [examState]);

  const timer = useTimer(examState.exam?.duration ?? 0, onSubmit);

  useCheatingDetection({
    onViolation: (reason) => {
      examState.incrementViolation();
      toast.warning(reason);
    },
  });

  useEffect(() => {
    const preventUnload = (event: BeforeUnloadEvent) => {
      if (examState.submitted) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", preventUnload);
    return () => window.removeEventListener("beforeunload", preventUnload);
  }, [examState.submitted]);

  const questions = examState.exam?.questions ?? [];
  const activeQuestion = questions[activeIndex];

  const selectedAnswer = useMemo(() => {
    if (!activeQuestion) return undefined;
    return examState.answers[activeQuestion.id]?.value;
  }, [activeQuestion, examState.answers]);

  if (examState.isLoading) return <p className="text-sm text-muted-foreground">Loading exam...</p>;
  if (examState.isError || !examState.exam) {
    return <p className="text-sm text-destructive">Exam not found.</p>;
  }

  return (
    <main className="space-y-4 p-6">
      <header className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <h1 className="text-xl font-semibold">{examState.exam.title}</h1>
          <p className="text-xs text-muted-foreground">Violations: {examState.violations}</p>
        </div>
        <Timer secondsLeft={timer.secondsLeft} />
      </header>

      <section className="grid gap-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border p-3">
          <p className="mb-2 text-sm font-medium">Questions</p>
          <div className="grid grid-cols-5 gap-2 md:grid-cols-4">
            {questions.map((question, index) => {
              const answered = Boolean(examState.answers[question.id]);
              return (
                <button
                  key={question.id}
                  className={`rounded-md border px-2 py-1 text-xs ${answered ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </aside>

        <article className="space-y-4 rounded-xl border p-4">
          {activeQuestion ? (
            <>
              <h2 className="font-medium">{activeQuestion.questionTitle}</h2>

              {activeQuestion.type === "text" ? (
                <textarea
                  className="min-h-28 w-full rounded-md border p-3 text-sm"
                  onChange={(event) => examState.setAnswer(activeQuestion.id, "text", event.target.value)}
                  value={typeof selectedAnswer === "string" ? selectedAnswer : ""}
                />
              ) : (
                <div className="space-y-2">
                  {activeQuestion.options?.map((option) => {
                    const isCheckbox = activeQuestion.type === "checkbox";
                    const checked = isCheckbox
                      ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                      : selectedAnswer === option;

                    return (
                      <label key={option} className="flex items-center gap-2 text-sm">
                        <input
                          checked={checked}
                          name={activeQuestion.id}
                          onChange={(event) => {
                            if (isCheckbox) {
                              const previous = Array.isArray(selectedAnswer) ? selectedAnswer : [];
                              const updated = event.target.checked
                                ? [...previous, option]
                                : previous.filter((item) => item !== option);
                              examState.setAnswer(activeQuestion.id, "checkbox", updated);
                            } else {
                              examState.setAnswer(activeQuestion.id, "radio", option);
                            }
                          }}
                          type={isCheckbox ? "checkbox" : "radio"}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              )}
            </>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <AppButton
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              type="button"
              variant="outline"
            >
              Previous
            </AppButton>
            <AppButton
              disabled={activeIndex >= questions.length - 1}
              onClick={() => setActiveIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              type="button"
              variant="outline"
            >
              Next
            </AppButton>
            <AppButton disabled={examState.submitPending || examState.submitted} onClick={onSubmit} type="button">
              {examState.submitted ? "Submitted" : examState.submitPending ? "Submitting..." : "Submit Exam"}
            </AppButton>
          </div>
        </article>
      </section>
    </main>
  );
}
