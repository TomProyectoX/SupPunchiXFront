import ProductsRow from "./ProductsRow";

export default function ProductsTable({ productos = [], handleEdit }) {
  return (
    <div className="border border-gray-700 rounded overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-900">
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Nombre</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Marca</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Descripción</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Precio</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Categoría</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <ProductsRow key={producto.idProducto} producto={producto} handleEdit={handleEdit} />
            ))
          ) : (
            <tr className="border-b border-gray-700 hover:bg-gray-900/30 transition-colors">
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-sm">
                No products loaded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}