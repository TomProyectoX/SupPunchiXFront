const OrdenPendienteCard = ({ item }) => {
  return (
    <div className="bg-gradient-to-r from-[#141414] to-[#050505] border border-[#CCFF00]/20 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#CCFF00] uppercase font-black tracking-widest truncate">
            {item.sabor || 'Sin Sabor'}
          </p>
          <p className="text-sm font-black uppercase text-white leading-tight truncate">
            {item.nombre}
          </p>
        </div>
        <span className="text-[9px] uppercase font-black bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-1 rounded-full flex-shrink-0">
          Pendiente de pago
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Cantidad: {item.cantidad}</p>
        <span className="text-sm font-black text-[#CCFF00]">
          {item.esGratis ? 'Gratis' : `$${(Number(item.precio || 0) * (item.cantidad || 0)).toLocaleString('es-AR')}`}
        </span>
      </div>
    </div>
  );
};

export default OrdenPendienteCard;
