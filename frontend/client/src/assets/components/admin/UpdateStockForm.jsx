import { useEffect, useState } from "react";

export default function UpdateStockForm({ producto, marcas = [], categorias = [] }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [marcaid, setMarcaid] = useState("");
  const [categoriaid, setCategoriaid] = useState("");

  useEffect(() => {
    if (!producto) return;

    setNombre(producto.nombre ?? "");
    setDescripcion(producto.descripcion ?? "");
    setPrecio(producto.precio ?? 0);
    setCategoriaid(producto.categoria?.id ?? "");
    setMarcaid(producto.marca?.idMarca ?? "");
  }, [producto]);

  return (
    <form id="update-product-form" className="w-full max-w-none rounded-2xl border border-emerald-400/20 bg-[#050505] p-8 shadow-[0_0_0_1px_rgba(163,230,53,0.08),0_0_40px_rgba(163,230,53,0.08)]">
      <div className="mb-6 border-b border-gray-700/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">Editar producto</p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-white">{producto?.nombre}</h3>
        <p className="mt-2 text-sm text-gray-400">Editá nombre, descripción, precio, categoría y marca</p>
      </div>

      <input type="hidden" name="productoId" value={producto?.idProducto ?? ""} />

      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Nombre</span>
        <input
          name="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#CCFF00]"
        />
      </label>

      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Descripción</span>
        <textarea
          name="descripcion"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full resize-none rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
        />
      </label>

      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Precio (ARS)</span>
        <input
          name="precio"
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
        />
      </label>

      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Categoría</span>
        <select
          name="categoria"
          value={categoriaid}
          onChange={(e) => setCategoriaid(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
        >
          <option value="">Seleccionar categoría</option>
          {categorias?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.description}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Marca</span>
        <select
          name="marca"
          value={marcaid}
          onChange={(e) => setMarcaid(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
        >
          <option value="">Seleccionar marca</option>
          {marcas?.map((marca) => (
            <option key={marca.idMarca} value={marca.idMarca}>
              {marca.nombre}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6 flex gap-3 border-t border-gray-700/80 pt-5">
        <button type="submit" className="rounded-md bg-[#CCFF00] px-4 py-2 text-sm font-black text-black transition-colors hover:bg-white">
          Guardar
        </button>
      </div>
    </form>
  );
}
