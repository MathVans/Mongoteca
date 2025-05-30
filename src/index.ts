import { connectDB } from "./database/db";
import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
