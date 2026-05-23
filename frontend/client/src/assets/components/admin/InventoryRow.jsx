import { useEffect, useRef, useState } from "react";

export default function InventoryRow({ producto, variante, handleDelete, handleEdit }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

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
          {producto.categoria?.description || "Sin categoría"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-gray-300 uppercase">
          {variante.sabor?.nombre || "Sin sabor"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-bold text-white">${producto.precio}</span>
      </td>

      <td className="px-6 py-4">
        <div>
          <div className="w-32 h-2 bg-gray-800 rounded overflow-hidden mb-2">
            <div
              className={`h-full ${
                variante.stock <= 0
                  ? "bg-red-500"
                  : variante.stock <= 25
                  ? "bg-yellow-500"
                  : "bg-[#CCFF00]"
              }`}
              style={{
                width: `${Math.min((variante.stock / 100) * 100, 100)}%`,
              }}
            />
          </div>
          <p
            className={`text-xs font-bold uppercase ${
              variante.stock <= 0
                ? "text-red-500"
                : variante.stock <= 25
                ? "text-yellow-500"
                : "text-[#CCFF00]"
            }`}
          >
            {variante.stock <= 0
              ? "STOCK DEPLETED"
              : variante.stock <= 25
              ? `${variante.stock}% CAPACITY`
              : `${variante.stock}% CAPACITY`}
          </p>
          <p className="text-xs text-gray-500 mt-1">{variante.stock} UNITS</p>
        </div>
      </td>

      <td className="px-6 py-4 overflow-visible">
        <div ref={ref} className="relative inline-block text-left overflow-visible">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm font-semibold"
          >
            Opciones
          </button>

          <div
            className={`${open ? "block" : "hidden"} absolute right-0 top-full mt-2 w-56 bg-[#0A0A0A] border border-gray-700 rounded-xl shadow-2xl p-2 z-50 transform-gpu origin-top-right`}
            role="menu"
            aria-hidden={!open}
          >
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
                role="menuitem"
                onClick={() => handleEdit(producto, variante)}
              >
                Editar stock
              </button>

              <button
                type="button"
                className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-800 rounded-lg transition-colors"
                role="menuitem"
                aria-label={`Eliminar producto ${producto.nombre}`}
                onClick={() => handleDelete(variante.id, producto.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}