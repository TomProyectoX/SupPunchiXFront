const PESOS_POR_PUNTO = 50;

const UsarPuntosSwitch = ({ puntosDisponibles, usarPuntos, onToggle, subtotal }) => {
  const descuento = puntosDisponibles * PESOS_POR_PUNTO;
  const descuentoAplicable = Math.min(descuento, subtotal);
  const totalConDescuento = Math.max(0, subtotal - descuentoAplicable);

  return (
    <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-black uppercase text-white">Usar mis puntos</p>
          <p className="text-xs text-gray-400 mt-1">
            Tenés <span className="text-[#CCFF00] font-bold">{puntosDisponibles} PTS</span> = ahorrás{" "}
            <span className="text-[#CCFF00] font-bold">${descuentoAplicable.toLocaleString("es-AR")}</span>
          </p>
        </div>

        {/* Switch */}
        <button
          onClick={onToggle}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            usarPuntos ? "bg-[#CCFF00]" : "bg-[#262626]"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-transform duration-300 ${
              usarPuntos ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {usarPuntos && (
        <div className="border-t border-[#262626] pt-3 space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString("es-AR")}</span>
          </div>
          <div className="flex justify-between text-[#CCFF00]">
            <span>Descuento ({puntosDisponibles} pts × $50)</span>
            <span>-${descuentoAplicable.toLocaleString("es-AR")}</span>
          </div>
          <div className="flex justify-between font-black text-white text-base pt-1 border-t border-[#262626]">
            <span>Total con descuento</span>
            <span className="text-[#CCFF00]">${totalConDescuento.toLocaleString("es-AR")}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsarPuntosSwitch;