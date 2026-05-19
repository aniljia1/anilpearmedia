import express from "express";
import { generateImage, analyzeImage } from "../controllers/imageController.js";
 
const router = express.Router();
 
router.post("/generate", generateImage);
router.post("/analyze", analyzeImage);
 
export default router;
 
