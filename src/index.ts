import { connectDB } from "./database/db";
import express from "express";
import dotenv from "dotenv";
import { AuthorService } from "./services/author.service";
import "reflect-metadata";

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    const author = new AuthorService();
    let newAuthor = {
        name: "Fernando Pessoa",
        nationality: "Lusitan",
        birthYear: 3000,
        metadata: { style: "Classics", gender: "M", legendary: true },
    };
    // const createdOne = author.createAuthor(newAuthor);
    // const updatedOne = author.updateAuthor(
    //     "6838b4ffcf03ace5f7218c08",
    //     newAuthor,
    // );
    const deletedOne = await author.delete("6838b4ffcf03ace5f7218c08");
    console.log("🚀 ~ app.listen ~ deletedOne:", deletedOne);
});
