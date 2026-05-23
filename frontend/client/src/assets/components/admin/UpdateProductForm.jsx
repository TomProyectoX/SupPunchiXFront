
import { useState, useEffect } from "react";

export default function UpdateProductForm({ producto, marcas, categorias}) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [marcaid, setMarcaid] = useState(0);
    const [categoriaid, setCategoriaid] = useState(0);
    useEffect(() => {
  if (!producto) return;

  setNombre(producto.nombre);
  setDescripcion(producto.descripcion);
  setPrecio(producto.precio);
  setCategoriaid(producto.categoria?.id ?? "");
  setMarcaid(producto.marca?.idMarca ?? "");
}, [producto]);



const handleSubmit = async (e) => {
  e.preventDefault();

  const vari =[producto.variantes]

  console.log(vari)
    const payload = {
    ...producto,
    nombre,
    descripcion,
    precio,
    categoriaid,
    marcaid

};

    console.log(JSON.stringify(payload))
  

  await fetch(`http://localhost:4002/productos/${producto.idProducto}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });




};

  return (
    <form id="update-product-form" className="w-full max-w-none rounded-2xl border border-emerald-400/20 bg-[#050505] p-8 shadow-[0_0_0_1px_rgba(163,230,53,0.08),0_0_40px_rgba(163,230,53,0.08)]">
      <div className="mb-6 border-b border-gray-700/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">Editar producto</p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-white">{producto?.nombre}</h3>
        <p className="mt-2 text-sm text-gray-400">Editá nombre, descripción, precio, categoría y marca</p>
      </div>

      {/* Identificadores (ocultos) */}
      <input type="hidden" name="productoId" value={producto?.idProducto} />

      {/* Nombre */}
      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Nombre</span>
        <input
          name="nombre"
          type="text"
          defaultValue={producto?.nombre}
          onChange={(e) => {
            const n = e.target.value
            setNombre(n)}}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#CCFF00]"
        />
      </label>

      {/* Descripción */}
      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Descripción</span>
        <textarea
          name="descripcion"
          defaultValue={producto?.descripcion}
          rows="3"
          onChange={(e) => {
            const n = e.target.value
            setDescripcion(n)}}
          className="mt-1 block w-full resize-none rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
        />
      </label>

      {/* Precio */}
      <label className="block mb-4">
        <span className="text-xs text-gray-400 uppercase">Precio (ARS)</span>
        <input
          name="precio"
          type="number"
          step="0.01"
          defaultValue={producto?.precio}
           onChange={(e) => {
            const n = Number(e.target.value)
            setPrecio(n)}}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
        />
      </label>

      {/* Categoría */}
     <label className="block mb-4">
  <span className="text-xs text-gray-400 uppercase">Categoría</span>

  <select
    name="categoria"
    value={categoriaid /* esto no tengo nidea pero hay q ponerlo */}
    onChange={(e) => setCategoriaid(Number(e.target.value))} 
    className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#CCFF00]"
  >{/* vamos a guardar el value de la <option> q seleccionemos */ }
    <option value="">Seleccionar categoría</option>

    {categorias?.map((cat) => (
      <option key={cat.id} value={cat.id}> {/* osea recorremos el estado categorias y por cada objeto generamos una option siendo el value lo que vamos a elegir la clave*/}
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
      <option key={marca.idMarca} value={marca.idMarca}> {/* por cada marca generamos un option que basicamente son cada desplegable */}
        {marca.nombre}    
      </option>
    ))}
  </select>
</label>

      {/* Acciones */}
      <div className="mt-6 flex gap-3 border-t border-gray-700/80 pt-5">
        <button type="submit"  onClick={handleSubmit} className="rounded-md bg-[#CCFF00] px-4 py-2 text-sm font-black text-black transition-colors hover:bg-white">Guardar</button>
      </div>
    </form>
  );
}
