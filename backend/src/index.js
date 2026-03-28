import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import textRoutes from "./routes/textRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/text", textRoutes);
app.use("/api/image", imageRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Pear Media Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
