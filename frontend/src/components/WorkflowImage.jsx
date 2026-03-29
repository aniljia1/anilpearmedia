import { useState } from "react";
import Loader from "./Loader";
import ImageCard from "./ImageCard";

export default function WorkflowImage() {
  const [preview, setPreview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [generated, setGenerated] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const API = import.meta.env.VITE_API_URL;
  // 🔥 Analyze Image (mock or backend)
  const handleAnalyze = async () => {
    if (!preview) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/image/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64: preview }),
      });

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setAnalysis("Analysis ");
    }
    setIsLoading(false);
  };

  // 🔥 Generate variation from analysis
  const handleGenerate = async () => {
    if (!analysis) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/image/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: analysis }),
      });

      const data = await res.json();
      setGenerated(data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">
        Image → Style Analyzer
      </h2>

      {/* Upload */}
      <input
        type="file"
        onChange={handleUpload}
        className="w-full p-2 border rounded-xl"
      />

      {/* Preview */}
      {preview && (
        <img src={preview} alt="Preview" className="mt-6 rounded-xl shadow" />
      )}

      {/* Analyze Button */}
      {preview && (
        <button
          onClick={handleAnalyze}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
          Analyze Image
        </button>
      )}

      {/* Analysis Result */}
      {analysis && (
        <div className="mt-4 p-3 bg-gray-100 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">Analysis:</h3>
          <p className="text-sm">{analysis}</p>
        </div>
      )}

      {/* Generate Button */}
      {analysis && (
        <button
          onClick={handleGenerate}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Generate Variation
        </button>
      )}

      {/* Loader */}
      {isLoading && <Loader />}

      {/* Generated Image */}
      {generated && <ImageCard src={generated} />}
    </div>
  );
}
