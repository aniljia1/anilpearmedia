import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const enhancePromptAPI = async (prompt) => {
  try {
    const res = await axios.post(`${API}/api/text/enhance`, { prompt });
    return res.data;
  } catch (err) {
    console.error("Enhance prompt error:", err);
    const message = err.response?.data?.error || "Error enhancing prompt. Please try again.";
    return { error: message };
  }
};

export const generateImageAPI = async (prompt) => {
  try {
    const res = await axios.post(`${API}/api/image/generate`, { prompt }, {
      timeout: 100000, // 100s — accounts for Render wake-up + model cold start
    });
    return { data: res.data, error: null };
  } catch (err) {
    console.error("Generate image error:", err);

    if (err.code === "ECONNABORTED") {
      return { data: null, error: "Request timed out. The server may be waking up — please try again." };
    }

    const message = err.response?.data?.error || "Image generation failed. Please try again.";
    return { data: null, error: message };
  }
};

export const analyzeImageAPI = async (base64) => {
  try {
    const res = await axios.post(`${API}/api/image/analyze`, { base64 }, {
      timeout: 40000,
    });
    return { data: res.data, error: null };
  } catch (err) {
    console.error("Analyze image error:", err);
    const message = err.response?.data?.error || "Image analysis failed. Please try again.";
    return { data: null, error: message };
  }
};
