import { useState } from "react";
import { enhancePromptAPI, generateImageAPI } from "../utils/api";
import Loader from "./Loader";
import ImageCard from "./ImageCard";

export default function WorkflowText() {
  const [input, setInput] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnhance = async () => {
    setLoading(true);
    setError("");
    const result = await enhancePromptAPI(input);

    if (result?.error) {
      setError(result.error);
    } else {
      setEnhanced(typeof result === "string" ? result : result?.data || "");
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    const result = await generateImageAPI(enhanced);

    if (result?.error) {
      setError(result.error);
    } else {
      // Handle both plain base64 string and { data: "..." } shape
      setImage(typeof result === "string" ? result : result?.data || "");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">
        Text → Image Generator
      </h2>

      <textarea
        placeholder="Enter your idea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-indigo-500"
      />

      <button
        onClick={handleEnhance}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
      >
        Enhance Prompt
      </button>

      {loading && <Loader />}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
          ⚠️ {error}
        </div>
      )}

      {enhanced && (
        <>
          <h3 className="mt-6 font-semibold">Enhanced Prompt</h3>
          <textarea
            value={enhanced}
            onChange={(e) => setEnhanced(e.target.value)}
            className="w-full p-3 border rounded-xl mt-2"
          />
          <button
            onClick={handleGenerate}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
          >
            Generate Image
          </button>
        </>
      )}

      {image && <ImageCard src={image} />}
    </div>
  );
}
