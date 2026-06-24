const ProductQuantitySelector = ({
  cantidad,
  setCantidad,
  stock,
  disponible,
  varianteSeleccionada,
  agregado,
  errorCarrito,
  onAddToCart,
}) => {
  const maxStock = stock || 999;

  return (
    <div className="border-t border-[#262626] pt-6">
      <p className="text-xs font-bold uppercase text-gray-500 mb-3">Cantidad</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#050505] border border-[#262626] rounded-xl overflow-hidden">
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            className="px-4 py-3 text-[#CCFF00] font-black hover:bg-[#CCFF00]/10 transition"
          >
            −
          </button>
          <input
            type="text"
            inputMode="numeric"
            min="1"
            max={maxStock}
            value={cantidad}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              setCantidad(Math.min(Math.max(1, val), maxStock));
            }}
            className="w-14 text-center bg-transparent text-white font-black border-none outline-none"
          />
          <button
            onClick={() => setCantidad(Math.min(cantidad + 1, maxStock))}
            className="px-4 py-3 text-[#CCFF00] font-black hover:bg-[#CCFF00]/10 transition"
          >
            +
          </button>
        </div>

        <button
          onClick={onAddToCart}
          disabled={!disponible || !varianteSeleccionada}
          className={`flex-1 py-3.5 px-6 font-black uppercase text-xs rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 ${
            agregado
              ? "bg-green-500 text-black shadow-lg shadow-green-500/40"
              : disponible && varianteSeleccionada
              ? "bg-[#CCFF00] text-black hover:bg-white shadow-lg shadow-[#CCFF00]/40"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          {agregado ? (
            <>
              <span className="material-symbols-outlined text-base">check</span>
              Añadido
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              Añadir
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Stock disponible: {stock || 0}</p>
      {errorCarrito && (
        <p className="text-sm text-red-400 font-bold mt-2">{errorCarrito}</p>
      )}
    </div>
  );
};

export default ProductQuantitySelector;