import { z } from "zod";

export const basicInfoSchema = z.object({
  title: z.string().min(3, "Title is required"),
  totalCandidates: z.coerce.number().int().min(1),
  totalSlots: z.coerce.number().int().min(1),
  questionSets: z.coerce.number().int().min(1),
  questionType: z.enum(["checkbox", "radio", "text"]),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.coerce.number().int().min(1),
  negativeMarking: z.boolean().default(false),
});

export type BasicInfoInput = z.infer<typeof basicInfoSchema>;
