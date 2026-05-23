export default function AdminHeader() {
  return (
    <header className="ml-64 bg-[#0A0A0A] border-b border-gray-700 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            ⌕
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-8">
        {/* Add New Product Button */}
        <button className="px-4 py-2 bg-[#CCFF00] text-black font-black text-xs uppercase rounded hover:bg-white transition-colors tracking-wide">
          + Add New Product
        </button>

        {/* Notifications */}
        <button className="text-gray-400 hover:text-[#CCFF00] transition-colors">
          ◯
        </button>

        {/* Settings */}
        <button className="text-gray-400 hover:text-[#CCFF00] transition-colors">
          ⚙
        </button>
      </div>
    </header>
  );
}
