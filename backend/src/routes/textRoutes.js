import express from "express";
import { enhancePrompt } from "../controllers/textController.js";

const router = express.Router();

// POST: Enhance text prompt
router.post("/enhance", enhancePrompt);

export default router;
