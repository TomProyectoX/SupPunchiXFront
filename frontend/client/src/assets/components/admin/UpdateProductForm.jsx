import { useEffect, useState } from "react";

export default function UpdateProductForm({ producto, marcas, categorias, sabores: saboresProp, onSaved, onClose }) {
  const isEditing = !!producto;
  
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [tamano, setTamano] = useState("");
  const [marcaid, setMarcaid] = useState("");
  const [categoriaid, setCategoriaid] = useState("");
  const [showSabores, setShowSabores] = useState(false);
  const [selectedSabores, setSelectedSabores] = useState([]);
  const [sabores, setSabores] = useState([])
  
  

  useEffect(() => {
    if (!isEditing) {
      setSabores(saboresProp || []);
      return;
    }

    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setTamano(producto.tamano || "");
    setCategoriaid(producto.categoria.id);
    setMarcaid(producto.marca.idMarca);
    setSabores(saboresProp);
    
    
    const saboresIniciales = (producto.variantes || []).map((variante) => ({
      idSabor: variante.sabor?.idSabor || variante.idSabor,
      stock: variante.stock || 0
    }));
    setSelectedSabores(saboresIniciales);
  
  }, [producto, saboresProp, isEditing]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // LÓGICA DE EDICIÓN
      try{
        console.log("[DEBUG] Form submitted");
        
        console.log("[DEBUG] Producto ID:", producto?.idProducto);
        if (!producto?.idProducto) {
          console.error("[ERROR] No hay idProducto");
          return;
        }

        const bodyData = {
          nombre,
          descripcion,
          precio,
          tamano: tamano,
          disponible: producto.disponible ?? true,
          imagen: producto.imagen ?? "url",
          idMarca: marcaid,
          idCategoria: categoriaid,
          variantes: selectedSabores
        };
     
        console.log(bodyData)
        const response = await fetch(`http://localhost:4002/productos/${producto.idProducto}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBwdW5jaGkuY29tIiwiaWF0IjoxNzc5NjY0NjA0LCJleHAiOjE3Nzk3NTEwMDR9.9fIxkkQVhJPCc78xu35r2fj4VRKwWeI_mfSR3Z2wwh33PqyVzGBvxEBzNBWsOV05BZ1TE68mKByt4mK3UPTG-Q',

          },
          body: JSON.stringify(bodyData),
        });

        

        if (!response.ok) {
          const errorData = await response.json();
          console.error("[ERROR] Response error:", errorData);
        }

        if (response.ok) {
          console.log("[DEBUG] Save successful, updating parent state");
       
          const marcaCompleta = marcas?.find((m) => m.idMarca === marcaid) || { idMarca: marcaid, nombre: "" };
          const categoriaCompleta = categorias?.find((c) => c.id === categoriaid) || { id: categoriaid, description: "" };
          
          const productoActualizado = {
            ...producto,
            nombre,
            descripcion,
            precio,
            tamano,
            disponible: producto.disponible ?? true,
            imagen: producto.imagen ?? "url",
            marca: marcaCompleta,
            categoria: categoriaCompleta,
            variantes: selectedSabores
          };
          console.log("[DEBUG] productoActualizado structure:", productoActualizado);
          onSaved?.(productoActualizado);
          onClose?.();
        }
      } catch(e) {
        console.error("[ERROR] handleSubmit error:", e);
        console.error("[ERROR] Stack:", e.stack);
      }
    } else {
      try {
        console.log("[DEBUG] Creating new product");

        const bodyData = {
          nombre,
          descripcion,
          precio,
          tamano: tamano,
          disponible: true,
          imagen: "url",
          idMarca: marcaid,
          idCategoria: categoriaid,
          variantes: selectedSabores
        };
          console.log(bodyData)

        const response = await fetch(`http://localhost:4002/productos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBwdW5jaGkuY29tIiwiaWF0IjoxNzc5NjY0NjA0LCJleHAiOjE3Nzk3NTEwMDR9.9fIxkkQVhJPCc78xu35r2fj4VRKwWeI_mfSR3Z2wwh33PqyVzGBvxEBzNBWsOV05BZ1TE68mKByt4mK3UPTG-Q',
          },
          body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("[ERROR] Response error:", errorData);
          return;
        }

        const responseData = await response.json();
        console.log("[DEBUG] New product response:", responseData);

        const marcaCompleta = marcas?.find((m) => m.idMarca === marcaid) || { idMarca: marcaid, nombre: "" };
        const categoriaCompleta = categorias?.find((c) => c.id === categoriaid) || { id: categoriaid, description: "" };
        
        const productoNuevo = {
          idProducto: responseData.idProducto || responseData.id,
          nombre,
          descripcion,
          precio,
          tamano,
          disponible: true,
          imagen: "url",
          marca: marcaCompleta,
          categoria: categoriaCompleta,
          variantes: selectedSabores
        };

        console.log("[DEBUG] Producto nuevo structure:", productoNuevo);
        onSaved?.(productoNuevo);
        onClose?.();
      } catch (e) {
        console.error("[ERROR] handleSubmit error:", e);
        console.error("[ERROR] Stack:", e.stack);
      }
    }
  };

   const toggleSabor = (sabor) => {
  setSelectedSabores((saboresActuales) => {
    const yaSeleccionado = saboresActuales.some(
      (s) => s.idSabor === sabor.idSabor
    );
    if (yaSeleccionado) {
      const nuevosSabores = saboresActuales.filter( /// si encuentra algun sabor que cumpla con la condicion, lo filtra (q es lo mismo q sacarlo)
        (s) => s.idSabor !== sabor.idSabor
      );
      return nuevosSabores;
    }
    const nuevosSabores = [
      ...saboresActuales,
      {
        idSabor: sabor.idSabor,
        stock: 0
      }
    ];
    return nuevosSabores;
  });
};
  return (
    <form id="product-form" onSubmit={handleSubmit} className="w-full max-w-none rounded-2xl border border-emerald-400/20 bg-[#050505] p-8 shadow-[0_0_0_1px_rgba(163,230,53,0.08),0_0_40px_rgba(163,230,53,0.08)]">
      <div className="mb-6 border-b border-gray-700/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          {isEditing ? "Editar producto" : "Nuevo producto"}
        </p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-white">
          {isEditing ? producto?.nombre : "Agregar Producto"}
        </h3>
        <p className="mt-2 text-sm text-gray-400">
          {isEditing 
            ? "Editá nombre, descripción, precio, categoría y marca" 
            : "Completá los datos para crear un nuevo producto"}
        </p>
      </div>

      {isEditing && <input type="hidden" name="productoId" value={producto?.idProducto ?? ""} />}

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
        <span className="text-xs text-gray-400 uppercase">Tamaño</span>
        <input
          name="tamano"
          type="text"
          value={tamano}
          onChange={(e) => setTamano(e.target.value)}
          placeholder="Ej: Grande, Mediano, Pequeño"
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#CCFF00]"
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
        <button
          type="button"
          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
          onClick={() => setShowSabores((v) => !v)}
        >
          {showSabores ? "Ocultar sabores" : isEditing ? "Actualizar sabores" : "Agregar sabores"}
        </button>

        <button 
          type="submit" 
          className="rounded-md bg-[#CCFF00] px-4 py-2 text-sm font-black text-black transition-colors hover:bg-white"
        >
          {isEditing ? "Guardar" : "Crear Producto"}
        </button>
      </div>

    
      {showSabores && (
        <div className="mt-4 border border-gray-700 rounded-lg p-4 bg-[#050505]">
   
          <div className="overflow-auto max-h-48">
            <table className="w-full text-left text-sm">
              <thead>
  
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Nombre</th>
                  <th className="py-2 px-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {sabores.map((sabor, index) => {
                  const saborId = sabor.idSabor ?? index;
                  const selected = selectedSabores.some((s) => s.idSabor === saborId);
                  return (
                    <tr key={saborId} className="border-t border-gray-700">
                      <td className="py-2 px-3 text-gray-300">{saborId}</td>
                      <td className="py-2 px-3 text-white">{sabor.nombre}</td>
                      <td className="py-2 px-3">
                        <button
                          type="button"
                          className={`px-3 py-1 rounded text-sm ${selected ? 'bg-red-600 text-white' : 'bg-emerald-600 text-black'}`}
                          onClick={() => toggleSabor({ idSabor: saborId, nombre: sabor.nombre })}
                        >
                          {selected ? 'Quitar' : 'Agregar'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <input type="hidden" name="saboresSelected" value={selectedSabores.map((s) => s.idSabor).join(',')} />
          <p className="text-xs text-gray-500 mt-2">IDs seleccionados: {selectedSabores.map((s) => s.idSabor).join(', ') || 'ninguno'}</p>
        </div>
      )}
    </form>
  );
}

