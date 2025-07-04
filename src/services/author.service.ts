import { AuthorDto, UpdateAuthorDto } from "../dtos/Author.dto";
import { AuthorModel } from "../models/Author";
import { ApiError } from "../utils/api-error";

export class AuthorService {
    async getAllAuthors(page: number, limit: number) {
        if (page < 1 || limit < 1) {
            throw ApiError.badRequest(
                "Page and limit must be positive numbers.",
            );
        }
        try {
            const skip = (page - 1) * limit;
            const authors = await AuthorModel.find({}).skip(skip).limit(limit);

            // Opcional: Contar o número total de documentos para fins de paginação no frontend
            const totalAuthors = await AuthorModel.countDocuments({});
            const totalPages = Math.ceil(totalAuthors / limit);

            return {
                authors,
                currentPage: page,
                totalPages,
                totalAuthors,
            };
        } catch (err) {
        }
    }

    async createAuthor(data: AuthorDto) {
        if (await AuthorModel.findOne({ name: data.name })) {
            throw ApiError.validation("This author already exist!");
        }
        const author = await AuthorModel.create(data);
        return author;
    }

    async updateAuthor(id: string, data: UpdateAuthorDto) {
        const author = await AuthorModel.findById(id);
        if (!author) {
            throw ApiError.notFound("Author not found");
        }

        if (data.name !== undefined && data.name !== author.name) {
            const existingAuthorWithNewName = await AuthorModel.findOne({
                name: data.name,
            });
            if (existingAuthorWithNewName) {
                throw ApiError.conflict(
                    "There's another author with this new name",
                );
            }
            author.name = data.name;
        }

        try {
            if (data.nationality !== undefined) {
                author.nationality = data.nationality;
            }
            if (data.birthYear !== undefined) {
                author.birthYear = data.birthYear;
            }
            if (data.metadata !== undefined) {
                author.metadata = data.metadata;
            }

            const updatedAuthor = await author.save();
            return updatedAuthor;
        } catch (err) {
            throw ApiError.internal(
                `Erro no sistema ao atualizar o autor: ${err}`,
            );
        }
    }

    async delete(id: string) {
        try {
            const deletedAuthor = await AuthorModel.findByIdAndDelete(id);

            if (!deletedAuthor) {
                throw ApiError.notFound("Author not found for deletion!");
            }

            return {
                message: "Author deleted successfully",
                author: deletedAuthor,
            };
        } catch (err: any) {
            if (err instanceof ApiError) {
                throw err;
            }

            console.error("Error deleting author:", err);
            throw ApiError.internal(
                `Erro ao deletar author: ${err.message || err}`,
            );
        }
    }

    async getAuthorByName(name: string) {
        return await AuthorModel.find({
            $or: [
                { name: { $regex: name, $options: "i" } },
                { nationality: { $regex: name, $options: "i" } },
                { metadata: { $regex: name, $options: "i" } },
            ],
        });
    }

    async getAuthorsByBirthYear(birthYear: number) {
        return await AuthorModel.find({ birthYear: birthYear });
    }
}
