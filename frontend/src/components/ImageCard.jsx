export default function ImageCard({ src }) {
  if (!src) return null;

  const handleView = () => {
    // Convert base64 to blob URL — Chrome can't render large data URLs directly
    const byteString = atob(src.split(",")[1]);
    const mimeType = src.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

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

        {/* View Full — opens as blob URL so Chrome renders it correctly */}
        <button
          onClick={handleView}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition"
        >
          View
        </button>
      </div>
    </div>
  );
}

