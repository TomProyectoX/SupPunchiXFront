export default function InventoryRow({ producto, variante, handleDelete, handleEdit }) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-900/30 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-lg font-black text-gray-400">
            ◻
          </div>
          <div>
            <p className="text-sm font-bold text-white">{producto.nombre}</p>
            <p className="text-xs text-gray-500 uppercase mt-1">{producto.descripcion}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-gray-300 uppercase">
          {variante.sabor?.nombre || "Sin sabor"}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <input
            type="number"
            defaultValue={variante.stock}
            min={0}
            className="w-24 bg-gray-800 text-white rounded px-2 py-1 text-sm"
            aria-label={`Stock for ${producto.nombre}`}
            onBlur={(e) => {
              const newStock = Number(e.target.value || 0);
              
              handleEdit(producto.id ,variante, newStock);
            }}
          />
          <p className="text-xs text-gray-500 mt-1">{variante.stock} UNITS</p>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center">
          <button
            type="button"
            className="px-3 py-1 bg-red-600 text-white rounded text-sm font-semibold"
            aria-label={`Eliminar variante ${variante.id} de ${producto.nombre}`}
            onClick={() => handleDelete(variante.id, producto.id)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}