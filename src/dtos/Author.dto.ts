import { z } from "zod";
import { Author } from "../models/Author";

export const AuthorSchema = z.object({
    name: z.string().max(50),
    nationality: z.string().max(50).optional(),
    birthYear: z.number().max(new Date().getFullYear()).optional(),
    metadata: z.record(z.any()).optional(),
});

export type AuthorDto = z.infer<typeof AuthorSchema>;
export type UpdateAuthorDto = Partial<Author>;
