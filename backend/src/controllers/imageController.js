import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const HF_API_KEY = process.env.HF_API_KEY;

    if (!HF_API_KEY) {
      console.error("HF_API_KEY is not set in environment variables");
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    let response;

    try {
      // Primary: stable-diffusion-v1-5 (faster, more reliable on free tier)
      response = await axios.post(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            Accept: "image/png",
          },
          responseType: "arraybuffer",
          timeout: 60000,
        }
      );
    } catch (err) {
      console.log("Primary model failed, trying fallback...", err.message);

      // Fallback: stable-diffusion-2-1
      response = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            Accept: "image/png",
          },
          responseType: "arraybuffer",
          timeout: 90000,
        }
      );
    }

    const contentType = response.headers["content-type"];

    // If HF returned JSON, it's an error (e.g. model loading)
    if (contentType && contentType.includes("application/json")) {
      const errorData = JSON.parse(Buffer.from(response.data).toString("utf-8"));
      console.error("HF API Error:", errorData);
      return res.status(503).json({
        error: errorData.error || "Model is loading, please try again in a moment",
      });
    }

    // Convert binary to base64
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const image = `data:image/png;base64,${base64}`;

    res.json(image);
  } catch (error) {
    console.error("HF Image Error:", error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        error: "Image generation timed out. The model may be loading — please try again.",
      });
    }

    res.status(500).json({
      error: "Image generation failed. Please try again.",
    });
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

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
      imageBuffer,
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/octet-stream",
        },
        timeout: 30000,
      }
    );

    const caption =
      response.data?.[0]?.generated_text || "A detailed artistic scene";

    res.json(caption);
  } catch (error) {
    console.error("HF Analyze Error:", error.message);
    res.status(500).json({ error: "Image analysis failed. Please try again." });
  }
};
