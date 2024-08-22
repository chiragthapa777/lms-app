import { z } from "zod";

export const ChapterSchema = z.object({
  title: z.string().min(2).max(50),
  category: z.string(),
  description: z.string(),
  price: z.preprocess((a) => Number(z.string().parse(a)), z.number().min(0)),
  photoLink: z.string().optional(),
});
