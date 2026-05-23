export default function ProductsRow({ producto, handleEdit }) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-900/30 transition-colors">
      <td className="px-6 py-4">
        <p className="text-sm font-bold text-white">{producto.nombre}</p>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-gray-300 uppercase">
          {producto.marca?.nombre || producto.marca || "Sin marca"}
        </span>
      </td>

      <td className="px-6 py-4 max-w-lg">
        <p className="text-sm text-gray-300 line-clamp-2">
          {producto.descripcion}
        </p>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-bold text-white">${producto.precio}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-gray-300 uppercase">
          {producto.categoria?.description || producto.categoria || "Sin categoría"}
        </span>
      </td>

      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => {handleEdit(producto)
          }}
          className="rounded-md border border-gray-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-200 transition-colors hover:border-[#CCFF00] hover:text-[#CCFF00]"
        >
          Editar
        </button>
      </td>
    </tr>
  );
}