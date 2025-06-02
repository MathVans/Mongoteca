import { Router } from "express";
import authorRoutes from "./Author.route";

const router = Router();

router.use("/author", authorRoutes);

export default router;
