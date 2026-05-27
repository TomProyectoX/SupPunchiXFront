export default function FilterPrice({ priceRange, onPriceChange }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black uppercase text-[#CCFF00]">
          Rango de precio
        </h3>
        <span className="text-white bg-[#141414] border border-[#262626] px-3 py-1 font-bold text-sm tracking-wider">
          ${priceRange}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100000"
        value={priceRange}
        onChange={(e) => onPriceChange(Number(e.target.value))}
        className="w-full h-2 bg-black appearance-none cursor-pointer accent-[#CCFF00]"
      />

      <div className="flex justify-between text-sm text-[#c4c9ac] font-bold">
        <span>$0</span>
        <span>$100.000+</span>
      </div>
    </div>
  );
}