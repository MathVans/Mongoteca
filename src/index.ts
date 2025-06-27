import "reflect-metadata";
import { connectDB } from "../infra/database/db";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route";

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(router);

app.listen(PORT, async () => {
    console.log(`System running at: ${PORT}`);
});
