const CartItemCard = ({ item, onEdit, onDeleteRequest }) => {
  return (
    <div className="group bg-gradient-to-r from-[#141414] to-[#050505] border border-[#262626] hover:border-[#CCFF00] rounded-xl p-4 transition duration-300 hover:shadow-lg hover:shadow-[#CCFF00]/20">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#CCFF00] uppercase font-black tracking-widest truncate">
            {item.sabor || 'Sin Sabor'}
          </p>
          <p className="text-sm font-black uppercase text-white leading-tight truncate">
            {item.nombre || 'Producto'}
          </p>
        </div>
        <button
          onClick={() => onDeleteRequest(item)}
          className="text-xs text-gray-400 hover:text-red-400 hover:bg-red-400/10 px-2 py-1 rounded transition font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center border border-[#262626] bg-[#0A0A0A] rounded-lg overflow-hidden hover:border-[#CCFF00] transition">
          <button
            onClick={() => onEdit(item, (item.cantidad || 1) - 1)}
            className="px-2.5 py-1.5 text-[#CCFF00] text-lg font-black hover:bg-[#262626] transition"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-black text-white min-w-8 text-center">
            {item.cantidad || 1}
          </span>
          <button
            onClick={() => onEdit(item, (item.cantidad || 1) + 1)}
            className="px-2.5 py-1.5 text-[#CCFF00] text-lg font-black hover:bg-[#262626] transition"
          >
            +
          </button>
        </div>

        <span className="text-sm font-black text-[#CCFF00] whitespace-nowrap">
          ${Number((item.precio || 0) * (item.cantidad || 0)).toLocaleString('es-AR')}
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;