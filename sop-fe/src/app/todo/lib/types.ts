import { z } from "zod";

const todoSchema = z.object({
  id: z.uuidv7(),
  content: z.string().trim().min(1),
  status: z.boolean(),
  date: z.iso.datetime(),
});

export type Todo = z.infer<typeof todoSchema>;
