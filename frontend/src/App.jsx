import { useState } from "react";
import Navbar from "./components/Navbar";
import WorkflowText from "./components/WorkflowText";
import WorkflowImage from "./components/WorkflowImage";

export default function App() {
  const [tab, setTab] = useState("text");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Navbar />

      {/* Tabs */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setTab("text")}
          className={`px-5 py-2 rounded-xl ${
            tab === "text" ? "bg-indigo-600 text-white" : "bg-white shadow"
          }`}
        >
          Creative Studio
        </button>

        <button
          onClick={() => setTab("image")}
          className={`px-5 py-2 rounded-xl ${
            tab === "image" ? "bg-indigo-600 text-white" : "bg-white shadow"
          }`}
        >
          Style Lab
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto mt-8 p-4">
        {tab === "text" ? <WorkflowText /> : <WorkflowImage />}
      </div>
    </div>
  );
}
