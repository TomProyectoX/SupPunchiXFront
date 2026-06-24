const ProductVariantSelector = ({ variantes, varianteSeleccionada, onSelect }) => {
  if (!variantes?.length) return null;

  return (
    <div className="border-t border-[#262626] pt-6">
      <h3 className="text-sm font-black uppercase mb-4 text-[#CCFF00]">Selecciona tu Sabor</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {variantes.map((variante) => (
          <button
            key={variante.id}
            onClick={() => onSelect(variante)}
            className={`py-3 px-3 rounded-xl border font-bold uppercase text-xs transition-all hover:-translate-y-0.5 ${
              varianteSeleccionada?.id === variante.id
                ? "border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00]"
                : "border-[#262626] text-gray-300 hover:border-[#CCFF00]/50 hover:text-[#CCFF00]"
            }`}
          >
            {variante.sabor?.nombre}
            <p className="text-[9px] text-gray-500 mt-1 font-medium">Stock: {variante.stock}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantSelector;