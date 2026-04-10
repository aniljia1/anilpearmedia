import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 🔥 Try NEW endpoint first
    let response;
    try {
      response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            Accept: "image/png",
          },
          responseType: "arraybuffer",
          timeout: 60000,
        },
      );
    } catch (err) {
      console.log("Router failed, trying fallback...");

      // 🔥 FALLBACK to old endpoint
      response = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            Accept: "image/png",
          },
          responseType: "arraybuffer",
        },
      );
    }

    const contentType = response.headers["content-type"];

    // Handle error response
    if (contentType.includes("application/json")) {
      const errorData = JSON.parse(
        Buffer.from(response.data).toString("utf-8"),
      );

      console.error("HF API Error:", errorData);

      return res.status(500).json({
        error: errorData.error || "Model loading, try again",
      });
    }

    // Convert to image
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const image = `data:image/png;base64,${base64}`;

    res.json(image);
  } catch (error) {
    console.error("HF Image Error:", error.message);

    res.status(500).json({
      error: "Image generation failed",
    });
  }
};
