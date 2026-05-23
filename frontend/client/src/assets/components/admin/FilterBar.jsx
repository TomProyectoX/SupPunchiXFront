export default function FilterBar() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl font-black text-gray-300 uppercase tracking-wide">
          Product Inventory
        </h2>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
          Premium elite gear and high-performance supplements.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-[#CCFF00] text-black font-bold text-xs rounded hover:bg-white transition-colors uppercase tracking-wide">
          All
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 font-bold text-xs rounded hover:bg-gray-700 transition-colors uppercase tracking-wide">
          Active
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 font-bold text-xs rounded hover:bg-gray-700 transition-colors uppercase tracking-wide">
          Archived
        </button>
        <button className="ml-auto px-4 py-2 bg-gray-800 text-gray-300 font-bold text-xs rounded hover:bg-gray-700 transition-colors uppercase tracking-wide">
          ⊞ Filter
        </button>
      </div>
    </div>
  );
}
