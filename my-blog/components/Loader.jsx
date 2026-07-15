"use client";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-700">Loading...</h2>

      <p className="text-gray-500 mt-2">
        Please wait while we fetch your content.
      </p>
    </div>
  );
}
export default Loading;
