import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/author.controller";

const router = Router();

router.route("/")
    .get(getAuthors)
    .post(createAuthor);

router.route("/id")
    .put()
    .delete();

export default router;
