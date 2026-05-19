import { useState } from "react";
import Loader from "./Loader";
import ImageCard from "./ImageCard";

export default function WorkflowImage() {
  const [preview, setPreview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [generated, setGenerated] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Analyze Image
  const handleAnalyze = async () => {
    if (!preview) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/image/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: preview }),
      });
      const data = await res.json();

      if (!res.ok || data?.error) {
        setError(data?.error || "Analysis failed. Please try again.");
      } else {
        setAnalysis(typeof data === "string" ? data : JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please check your connection.");
    }
    setIsLoading(false);
  };

  // Generate variation from analysis
  const handleGenerate = async () => {
    if (!analysis) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/image/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: analysis }),
      });
      const data = await res.json();

      if (!res.ok || data?.error) {
        setError(data?.error || "Image generation failed. Please try again.");
      } else {
        // Handle both plain base64 string and { data: "..." } shape
        setGenerated(typeof data === "string" ? data : data?.data || "");
      }
    } catch (err) {
      console.error(err);
      setError("Image generation failed. Please check your connection.");
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
        accept="image/*"
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
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          Analyze Image
        </button>
      )}

      {/* Loader */}
      {isLoading && <Loader />}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
          ⚠️ {error}
        </div>
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
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          Generate Variation
        </button>
      )}

      {/* Generated Image */}
      {generated && <ImageCard src={generated} />}
    </div>
  );
}

