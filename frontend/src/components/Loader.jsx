export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 space-y-3">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-indigo-600 font-medium animate-pulse">
        Generating your AI image...
      </p>
    </div>
  );
}
