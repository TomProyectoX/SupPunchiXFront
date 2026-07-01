export default function ProductsRow({ producto, handleEdit, handleDelete }) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-900/30 transition-colors">
      <td className="px-4 py-3">
        <p className="text-sm font-bold text-white whitespace-nowrap">{producto.nombre}</p>
      </td>

      <td className="px-4 py-3">
        <span className="text-xs font-semibold text-gray-300 uppercase whitespace-nowrap">
          {producto.marca?.nombre || producto.marca || "Sin marca"}
        </span>
      </td>

      <td className="px-4 py-3 max-w-xs">
        <p className="text-sm text-gray-300 line-clamp-2">
          {producto.descripcion}
        </p>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm font-bold text-white whitespace-nowrap">${producto.precio}</span>
      </td>

      <td className="px-4 py-3">
        <span className="text-xs font-semibold text-gray-300 uppercase whitespace-nowrap">
          {producto.categoria?.description || producto.categoria || "Sin categoría"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-gray-300 uppercase whitespace-nowrap">
          {producto.tamano || "N/A"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => { handleEdit(producto) }}
            className="rounded-md border border-gray-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-200 transition-colors hover:border-[#CCFF00] hover:text-[#CCFF00]"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(producto)
              handleDelete(producto)
            }}
            className="rounded-md border border-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-300 transition-colors hover:bg-red-600 hover:text-white"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}