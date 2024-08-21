import { z } from "zod";

export const ChapterSchema = z.object({
  title: z.string().min(2).max(50),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  photoLink: z.string().optional(),
});
