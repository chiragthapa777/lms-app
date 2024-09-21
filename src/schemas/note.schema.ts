import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string().min(2).max(50),
  chapterId: z.number(),
  content: z.string(),
});
