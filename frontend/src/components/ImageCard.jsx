export default function ImageCard({ src }) {
  if (!src) return null;

  return (
    <div className="mt-6 bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
      {/* Image */}
      <img
        src={src}
        alt="Generated"
        className="w-full rounded-xl shadow-md hover:scale-105 transition duration-300"
      />

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Download Button */}
        <a href={src} download="ai-image.png">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
            Download
          </button>
        </a>

        {/* View Full */}
        <a href={src} target="_blank">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition">
            View
          </button>
        </a>
      </div>
    </div>
  );
}
