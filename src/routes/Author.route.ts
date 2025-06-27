import { Router } from "express";
import {
    createAuthor,
    deleteAuthor,
    getAuthorByName,
    getAuthors,
    getAuthorsByBirthYear,
    updateAuthor,
} from "../controllers/author.controller";

const router = Router();

router.route("/")
    .get(getAuthors)
    .post(createAuthor);

router.route("/:id")
    .put(updateAuthor)
    .delete(deleteAuthor);

router.route("/:id/books");

router.route("/search").get(getAuthorByName);
router.route("/birthyear").get(getAuthorsByBirthYear);

export default router;
