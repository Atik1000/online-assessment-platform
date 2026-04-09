"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { useStepperForm } from "@/hooks/useStepperForm";
import { createExam } from "@/services/exam.service";
import { useCreateTestStore } from "@/store/create-test-store";
import { basicInfoSchema, type BasicInfoInput } from "@/features/employer/schemas/create-test-schema";
import { QuestionBuilder } from "@/features/employer/components/question-builder";

export function CreateTestForm() {
  const stepper = useStepperForm(2);
  const queryClient = useQueryClient();
  const questions = useCreateTestStore((state) => state.questions);
  const clear = useCreateTestStore((state) => state.clear);

  const form = useForm<BasicInfoInput>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: "",
      totalCandidates: 10,
      totalSlots: 1,
      questionSets: 1,
      questionType: "radio",
      startTime: "",
      endTime: "",
      duration: 60,
      negativeMarking: false,
    },
  });

  const createExamMutation = useMutation({
    mutationFn: createExam,
    onSuccess: async () => {
      toast.success("Exam created");
      await queryClient.invalidateQueries({ queryKey: ["exams"] });
      form.reset();
      clear();
      stepper.goToStep(0);
    },
  });

  const stepTitle = useMemo(
    () => (stepper.activeStep === 0 ? "Step 1: Basic Info" : "Step 2: Question Builder"),
    [stepper.activeStep],
  );

  const handleCreate = form.handleSubmit(async (values) => {
    if (questions.length === 0) {
      toast.error("Add at least one question before publishing");
      return;
    }

    await createExamMutation.mutateAsync({
      ...values,
      questions,
    });
  });

  return (
    <section className="space-y-4">
      <div className="rounded-xl border p-4">
        <h2 className="text-lg font-semibold">Create Test</h2>
        <p className="text-sm text-muted-foreground">{stepTitle}</p>
      </div>

      {stepper.activeStep === 0 ? (
        <form className="grid gap-3 rounded-2xl border p-4 md:grid-cols-2" onSubmit={form.handleSubmit(() => stepper.nextStep())}>
          <AppInput placeholder="Title" {...form.register("title")} />
          <AppInput placeholder="Total candidates" type="number" {...form.register("totalCandidates", { valueAsNumber: true })} />
          <AppInput placeholder="Total slots" type="number" {...form.register("totalSlots", { valueAsNumber: true })} />
          <AppInput placeholder="Question sets" type="number" {...form.register("questionSets", { valueAsNumber: true })} />
          <select className="h-10 rounded-md border px-3 text-sm" {...form.register("questionType")}>
            <option value="radio">radio</option>
            <option value="checkbox">checkbox</option>
            <option value="text">text</option>
          </select>
          <AppInput placeholder="Duration (minutes)" type="number" {...form.register("duration", { valueAsNumber: true })} />
          <AppInput type="datetime-local" {...form.register("startTime")} />
          <AppInput type="datetime-local" {...form.register("endTime")} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...form.register("negativeMarking")} />
            Enable negative marking
          </label>
          <div className="md:col-span-2">
            <AppButton type="submit">Continue</AppButton>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <QuestionBuilder />
          <div className="flex gap-2">
            <AppButton type="button" variant="outline" onClick={stepper.prevStep}>
              Back
            </AppButton>
            <AppButton disabled={createExamMutation.isPending} onClick={handleCreate}>
              {createExamMutation.isPending ? "Publishing..." : "Publish Test"}
            </AppButton>
          </div>
        </div>
      )}
    </section>
  );
}
