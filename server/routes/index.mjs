import Router from "express";
import appealsRouter from "./appeals.mjs";

const router = Router();

router.use("/appeal", appealsRouter);

export default router;