import ProductRow from "./ProductRow";

export default function ProductTable({ productos = [] , handleDelete, handleEdit }) {
  return (
    <div className="border border-gray-700 rounded overflow-visible">
      {/* Table Header */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-900">
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Categoria</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Sabor</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Price</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Stock Level</th>
            <th className="px-6 py-4 text-left text-xs font-black text-gray-300 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 && ( // si la longitud del estado (array) es mayor a 0 (osea que haya productos) entonces se ejecuta el map
            productos.flatMap((producto) =>(producto.variantes.map((variante) => (<ProductRow key={variante.id} producto={producto} variante={variante} handleDelete={handleDelete} handleEdit={handleEdit}/>
            )) // el  && es un and, y basicamente si productos.length > 0 devuelve true se ejecuta la segunda condicion
               // asi es como funcionan los and en react al parecer (op)
            ))
          )}

          {productos.length === 0 && (
            <tr className="border-b border-gray-700 hover:bg-gray-900/30 transition-colors">
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                No products loaded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
