"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { AppModal } from "@/components/shared/app-modal";
import { questionSchema, type QuestionInput } from "@/features/employer/schemas/question-schema";
import { useCreateTestStore } from "@/store/create-test-store";

export function QuestionBuilder() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const questions = useCreateTestStore((state) => state.questions);
  const addQuestion = useCreateTestStore((state) => state.addQuestion);
  const updateQuestion = useCreateTestStore((state) => state.updateQuestion);
  const deleteQuestion = useCreateTestStore((state) => state.deleteQuestion);

  const form = useForm<QuestionInput>({
    resolver: zodResolver(questionSchema),
    defaultValues: { questionTitle: "", type: "radio", options: ["", ""] },
  });

  const currentType = form.watch("type");

  const submitQuestion = form.handleSubmit((values) => {
    const payload = {
      questionTitle: values.questionTitle,
      type: values.type,
      options: values.type === "text" ? [] : values.options.filter(Boolean),
    };

    if (editingId) {
      updateQuestion(editingId, payload);
    } else {
      addQuestion(payload);
    }

    setEditingId(null);
    form.reset({ questionTitle: "", type: "radio", options: ["", ""] });
  });

  const title = useMemo(() => (editingId ? "Edit Question" : "Add Question"), [editingId]);

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Question Builder</h3>
        <AppModal
          title={title}
          trigger={<AppButton>{editingId ? "Update Question" : "Add Question"}</AppButton>}
        >
          <form className="space-y-3" onSubmit={submitQuestion}>
            <AppInput placeholder="Question title" {...form.register("questionTitle")} />
            <select className="h-10 w-full rounded-md border px-3 text-sm" {...form.register("type")}>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="text">text</option>
            </select>
            {currentType !== "text" ? (
              <div className="space-y-2">
                <AppInput placeholder="Option 1" {...form.register("options.0")} />
                <AppInput placeholder="Option 2" {...form.register("options.1")} />
              </div>
            ) : null}
            <AppButton className="w-full" type="submit">
              Save Question
            </AppButton>
          </form>
        </AppModal>
      </div>

      <div className="space-y-2">
        {questions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No questions added yet.</p>
        ) : (
          questions.map((question, index) => (
            <div key={question.id} className="rounded-xl border p-3">
              <p className="text-sm font-medium">Q{index + 1}: {question.questionTitle}</p>
              <p className="text-xs text-muted-foreground">Type: {question.type}</p>
              <div className="mt-2 flex gap-2">
                <AppButton
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setEditingId(question.id);
                    form.reset({
                      questionTitle: question.questionTitle,
                      type: question.type,
                      options: question.options && question.options.length > 0 ? question.options : ["", ""],
                    });
                  }}
                >
                  Edit
                </AppButton>
                <AppButton size="sm" variant="destructive" type="button" onClick={() => deleteQuestion(question.id)}>
                  Delete
                </AppButton>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
