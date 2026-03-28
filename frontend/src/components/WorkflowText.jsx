import { useState } from "react";
import { enhancePromptAPI, generateImageAPI } from "../utils/api";
import Loader from "./Loader";
import ImageCard from "./ImageCard";

export default function WorkflowText() {
  const [input, setInput] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    const result = await enhancePromptAPI(input);
    setEnhanced(result);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const img = await generateImageAPI(enhanced);
    setImage(img);
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
