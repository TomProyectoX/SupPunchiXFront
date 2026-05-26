import { useState } from "react";

export default function EntityFormCard({ entityName, items, onAdd, onEdit, onDelete }) {
  const [nombre, setNombre] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingNombre, setEditingNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      onAdd(nombre);
      setNombre("");
    }
  };

  const handleSaveEdit = (id) => {
    if (editingNombre.trim()) {
      onEdit(id, editingNombre);
      setEditingId(null);
      setEditingNombre("");
    }
  };

  const startEdit = (id, currentNombre) => {
    setEditingId(id);
    setEditingNombre(currentNombre);
  };

  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-[#050505] p-6 shadow-[0_0_0_1px_rgba(163,230,53,0.08),0_0_40px_rgba(163,230,53,0.08)]">
      <div className="mb-6 border-b border-gray-700/80 pb-4">
        <h3 className="text-lg font-black tracking-tight text-white capitalize">
          Agregar {entityName}
        </h3>
        <p className="mt-1 text-xs text-gray-400">Crea una nueva {entityName}</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={`Nombre de ${entityName}`}
            className="flex-1 rounded-md border border-gray-700 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#CCFF00]"
          />
          <button
            type="submit"
            className="rounded-md bg-[#CCFF00] px-4 py-2 text-sm font-black text-black transition-colors hover:bg-white"
          >
            Agregar
          </button>
        </div>
      </form>

      {/* Lista de items */}
      <div className="border-t border-gray-700/80 pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          {entityName}s actuales ({items.length})
        </p>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id || item.idMarca || item.idSabor}
                className="flex items-center gap-2 rounded-md bg-gray-800/40 px-3 py-2 border border-gray-700 hover:bg-gray-800/60 transition-colors"
              >
                {editingId === (item.id || item.idMarca || item.idSabor) ? (
                  <>
                    <input
                      type="text"
                      value={editingNombre}
                      onChange={(e) => setEditingNombre(e.target.value)}
                      className="flex-1 rounded-md border border-gray-600 bg-[#0B1220] px-2 py-1 text-sm text-white outline-none focus:border-[#CCFF00]"
                    />
                    <button
                      onClick={() => handleSaveEdit(item.id || item.idMarca || item.idSabor)}
                      className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-black hover:bg-emerald-700 transition-colors"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-md bg-gray-600 px-2 py-1 text-xs font-semibold text-white hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm text-gray-200">
                      {item.nombre || item.description}
                    </span>
                    <button
                      onClick={() => startEdit(item.id || item.idMarca || item.idSabor, item.nombre || item.description)}
                      className="rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(item.id || item.idMarca || item.idSabor)}
                      className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic">No hay {entityName}s creadas</p>
          )}
        </div>
      </div>
    </div>
  );
}
