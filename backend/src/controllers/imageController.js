import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const HF_API_KEY = process.env.HF_API_KEY;
    if (!HF_API_KEY) {
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "image/jpeg",
        },
        responseType: "arraybuffer",
        timeout: 90000,
      }
    );

    const contentType = response.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
      const errorData = JSON.parse(Buffer.from(response.data).toString("utf-8"));
      console.error("HF API Error:", errorData);
      return res.status(503).json({
        error: errorData.error || "Model is loading, please try again in a moment",
      });
    }

    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const mimeType = contentType?.includes("jpeg") ? "image/jpeg" : "image/png";
    const image = `data:${mimeType};base64,${base64}`;

    res.json(image);
  } catch (error) {
    console.error("HF Image Error:", error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({ error: "Image generation timed out. Please try again." });
    }

    res.status(500).json({ error: "Image generation failed. Please try again." });
  }
};

export const analyzeImage = async (req, res) => {
  try {
    const { base64 } = req.body;

    if (!base64) {
      return res.status(400).json({ error: "Image data is required" });
    }

    const HF_API_KEY = process.env.HF_API_KEY;
    if (!HF_API_KEY) {
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    const rawBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
    const imageBuffer = Buffer.from(rawBase64, "base64");

    // Use router endpoint for BLIP (same fix as generate)
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-large",
      imageBuffer,
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/octet-stream",
        },
        timeout: 30000,
      }
    );

    const caption = response.data?.[0]?.generated_text || "A detailed artistic scene";
    res.json(caption);
  } catch (error) {
    console.error("HF Analyze Error:", error.message);
    res.status(500).json({ error: "Image analysis failed. Please try again." });
  }
};
