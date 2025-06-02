import { NextFunction, Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { AuthorSchema } from "../dtos/Author.dto";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error";

const authorService = new AuthorService();

export const getAuthors = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { page: pageStr, limit: limitStr } = req.query;

    const page = pageStr ? +pageStr : 1;
    const limit = limitStr ? +limitStr : 10;

    try {
        const result = await authorService.getAllAuthors(page, limit);

        res.status(200).json({
            success: true,
            count: result?.authors.length,
            totalPages: result?.totalPages,
            totalAuthors: result?.totalAuthors,
            data: result?.authors ?? [],
        });
    } catch (error) {
        next(error);
    }
};

export const createAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authorData = AuthorSchema.parse(req.body);
        const newAuthor = await authorService.createAuthor(authorData);
        res.status(201).json({
            success: true,
            data: newAuthor,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return next(
                ApiError.validation(
                    "Invalid input data",
                    error.flatten().fieldErrors,
                ),
            );
        }
        next(error);
    }
};
