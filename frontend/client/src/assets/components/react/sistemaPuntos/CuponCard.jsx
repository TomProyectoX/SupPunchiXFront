const CuponCard = ({ cupon, puntos, onCanjear, canjeoLoading = false }) => {
  const puedeCanjear = puntos >= cupon.costo;
  const esBloqueado = cupon.bloqueado || false;

  const handleCanjear = () => {
    if (puedeCanjear && !canjeoLoading) {
      onCanjear(cupon);
    }
  };

  return (
    <div
      className={`bg-[#141414] border border-[#262626] overflow-hidden group flex flex-col md:flex-row h-full ${
        !puedeCanjear && !esBloqueado ? "opacity-100" : !esBloqueado ? "opacity-100" : "opacity-80"
      }`}
    >
      {/* Emoji Cupón */}
      <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden bg-surface-container flex items-center justify-center">
        <span className="text-8xl">🎫</span>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent md:bg-gradient-to-r"></div>

        {/* Etiqueta de bloqueado */}
        {esBloqueado && (
          <div className="absolute top-2 left-2 bg-[#0A0A0A]/80 px-2 py-1 flex items-center gap-1 border border-[#262626]">
            <span className="material-symbols-outlined text-white text-xs">lock</span>
            <span className="text-[10px] font-bold text-white uppercase">Bloqueado</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-2">
            <span
              className={`font-label-bold text-label-bold tracking-widest uppercase ${
                puedeCanjear && !esBloqueado ? "text-[#CCFF00]" : "text-on-surface-variant"
              }`}
            >
              {cupon.comercio}
            </span>
            {cupon.categoria && (
              <span className="bg-[#262626] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {cupon.categoria}
              </span>
            )}
          </div>

          {/* Título */}
          <h3 className="font-headline-md text-[24px] text-white leading-tight mb-2 uppercase">
            {cupon.titulo}
          </h3>

          {/* Descripción */}
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">{cupon.icono}</span>
            <span className="font-body-md text-sm">{cupon.descripcion}</span>
          </div>
        </div>

        {/* Footer con precio y botón */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="font-label-bold text-[10px] text-on-surface-variant">COSTO</span>
            <span className="font-stats-num text-[#CCFF00]">{cupon.costo} PTS</span>
          </div>

          {puedeCanjear && !esBloqueado ? (
            <button
              onClick={handleCanjear}
              disabled={canjeoLoading}
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A0A0A] font-label-bold text-label-bold px-6 py-3 uppercase transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {canjeoLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">
                    refresh
                  </span>
                  PROCESANDO...
                </>
              ) : (
                "CANJEAR CUPÓN"
              )}
            </button>
          ) : esBloqueado ? (
            <button
              disabled
              className="bg-surface-container-highest text-on-surface-variant cursor-not-allowed font-label-bold text-[12px] px-6 py-3 uppercase border border-[#262626]"
            >
              BLOQUEADO
            </button>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              <div className="w-full bg-[#262626] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-on-surface-variant h-full"
                  style={{ width: `${(puntos / cupon.costo) * 100}%` }}
                ></div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-bold text-[10px] text-on-surface-variant">
                  COSTO: {cupon.costo} PTS
                </span>
                <span className="font-body-md text-[12px] text-on-surface-variant italic">
                  Tienes {puntos} pts / Necesitas {cupon.costo} pts
                </span>
              </div>
              <button
                disabled
                className="bg-surface-container-highest text-on-surface-variant cursor-not-allowed font-label-bold text-[12px] px-6 py-3 uppercase border border-[#262626]"
              >
                PUNTOS INSUFICIENTES
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CuponCard;
