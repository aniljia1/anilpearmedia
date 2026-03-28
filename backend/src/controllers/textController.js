export const enhancePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const styles = [
      "cinematic lighting",
      "golden hour",
      "soft shadows",
      "ultra realistic",
      "4k resolution",
      "depth of field",
      "professional photography",
      "dramatic composition",
    ];

    const randomStyles = styles
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .join(", ");

    const enhanced = `${prompt}, ${randomStyles}, highly detailed, masterpiece, trending on artstation`;

    res.json(enhanced);
  } catch (error) {
    console.error("Enhance Error:", error.message);

    res.status(500).json({ error: "Enhancement failed" });
  }
};
