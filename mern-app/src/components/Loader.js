// src/components/Loader.js

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[100px]">
      <div className="w-12 h-12 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
