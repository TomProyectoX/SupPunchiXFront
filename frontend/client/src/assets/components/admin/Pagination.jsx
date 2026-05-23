export default function Pagination() {
  return (
    <div className="flex items-center justify-between mt-8">
      {/* Text Info */}
      <p className="text-xs text-gray-400 uppercase tracking-wide">
        Showing 1 to 8 of 1,248 products
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-[#CCFF00] hover:bg-gray-800 rounded transition-colors font-bold">
          ◄
        </button>

        <button className="px-3 py-2 bg-[#CCFF00] text-black font-bold rounded text-sm">
          1
        </button>
        <button className="px-3 py-2 text-gray-400 font-bold rounded text-sm hover:bg-gray-800 transition-colors">
          2
        </button>
        <button className="px-3 py-2 text-gray-400 font-bold rounded text-sm hover:bg-gray-800 transition-colors">
          3
        </button>

        <span className="text-gray-400 font-bold">...</span>

        <button className="px-3 py-2 text-gray-400 font-bold rounded text-sm hover:bg-gray-800 transition-colors">
          8
        </button>

        <button className="p-2 text-gray-400 hover:text-[#CCFF00] hover:bg-gray-800 rounded transition-colors font-bold">
          ►
        </button>
      </div>
    </div>
  );
}
