import { z } from "zod";

export const ChapterSchema = z.object({
  title: z.string().min(2).max(50),
  courseId: z.number(),
  content: z.string(),
  videoLink: z.string().optional(),
});
