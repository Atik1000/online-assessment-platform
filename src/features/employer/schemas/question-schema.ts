import { z } from "zod";

export const questionSchema = z
  .object({
    questionTitle: z.string().min(5, "Question title is required"),
    type: z.enum(["checkbox", "radio", "text"]),
    options: z.array(z.string().min(1)).default([]),
  })
  .superRefine((value, ctx) => {
    if (value.type !== "text" && value.options.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least 2 options are required for radio/checkbox",
        path: ["options"],
      });
    }
  });

export type QuestionInput = z.infer<typeof questionSchema>;
