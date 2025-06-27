import { Author } from "./../models/Author";
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

export const updateAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.params.id;
        const authorData = AuthorSchema.parse(req.body);
        await authorService.updateAuthor(id, authorData).then(
            (updatedAuthor) => {
                res.status(200).json({
                    success: true,
                    data: updatedAuthor,
                });
            },
        );
    } catch (err) {
        if (err instanceof ZodError) {
            return next(
                ApiError.validation(
                    "Invalid input data",
                    err.flatten().fieldErrors,
                ),
            );
        }
        next(err);
    }
};

export const deleteAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.params.id;
        const result = await authorService.delete(id);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const getAuthorByName = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const name = req.query.name as string;

    try {
        const author = await authorService.getAuthorByName(name);
        if (!author) {
            return next(ApiError.notFound("Author not found"));
        }
        res.status(200).json({
            success: true,
            data: author,
        });
    } catch (error) {
        next(error);
    }
};

export const getAuthorsByBirthYear = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const birthYear = parseInt(req.params.birthYear, 10);

    try {
        const authors = await authorService.getAuthorsByBirthYear(birthYear);
        if (!authors || authors.length === 0) {
            return next(
                ApiError.notFound("No authors found for this birth year"),
            );
        }
        res.status(200).json({
            success: true,
            data: authors,
        });
    } catch (error) {
        next(error);
    }
};
