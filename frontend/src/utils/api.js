import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const enhancePromptAPI = async (prompt) => {
  try {
    const res = await axios.post(`${API}/api/text/enhance`, { prompt });
    return res.data;
  } catch (err) {
    console.error(err);
    return "Error enhancing prompt";
  }
};

export const generateImageAPI = async (prompt) => {
  try {
    const res = await axios.post(`${API}/api/image/generate`, { prompt });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
