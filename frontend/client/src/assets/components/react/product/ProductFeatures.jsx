const ProductFeatures = ({ producto }) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-8 py-8 border-y border-[#262626]">
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase font-bold">Disponibilidad</p>
        <p className="font-black text-[#CCFF00]">{producto.disponible ? "En Stock" : "Agotado"}</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase font-bold">Categoría</p>
        <p className="font-black uppercase">{producto.categoria?.description || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase font-bold">Marca</p>
        <p className="font-black uppercase">{producto.marca?.nombre || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase font-bold">ID Producto</p>
        <p className="font-black">{producto.idProducto}</p>
      </div>
    </div>
  );
};

export default ProductFeatures;