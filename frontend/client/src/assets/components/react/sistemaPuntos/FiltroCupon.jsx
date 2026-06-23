import { useState } from "react";

const FiltroCupon = ({ cupones, puntos, onFiltroChange }) => {
  const [filtroActual, setFiltroActual] = useState("accesibles");

  const handleFiltro = (tipo) => {
    setFiltroActual(tipo);
    onFiltroChange(tipo);
  };

  // Contar cupones por tipo
  const accesobles = cupones.filter((c) => !c.bloqueado && puntos >= c.costo).length;
  const todosDisponibles = cupones.filter((c) => !c.bloqueado).length;

  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
      <button
        onClick={() => handleFiltro("accesibles")}
        className={`font-label-bold text-label-bold px-6 py-2 uppercase transition-all whitespace-nowrap ${
          filtroActual === "accesibles"
            ? "bg-[#CCFF00] text-[#0A0A0A]"
            : "bg-surface-container text-on-surface border border-[#262626] hover:bg-surface-container-high"
        }`}
      >
        Accesibles ({accesobles})
      </button>

      <button
        onClick={() => handleFiltro("todos")}
        className={`font-label-bold text-label-bold px-6 py-2 uppercase transition-all whitespace-nowrap ${
          filtroActual === "todos"
            ? "bg-[#CCFF00] text-[#0A0A0A]"
            : "bg-surface-container text-on-surface border border-[#262626] hover:bg-surface-container-high"
        }`}
      >
        Todos ({todosDisponibles})
      </button>

      <button
        onClick={() => handleFiltro("bloqueados")}
        className={`font-label-bold text-label-bold px-6 py-2 uppercase transition-all whitespace-nowrap ${
          filtroActual === "bloqueados"
            ? "bg-[#CCFF00] text-[#0A0A0A]"
            : "bg-surface-container text-on-surface border border-[#262626] hover:bg-surface-container-high"
        }`}
      >
        Bloqueados ({cupones.filter((c) => c.bloqueado).length})
      </button>
    </div>
  );
};

export default FiltroCupon;
