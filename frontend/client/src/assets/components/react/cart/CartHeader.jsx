const CartHeader = ({ totalItems, onClose }) => {
  return (
    <div className="relative px-6 py-6 border-b border-[#262626] bg-gradient-to-r from-[#0A0A0A] to-[#141414] overflow-hidden">
      <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#CCFF00] rounded-full blur-[120px] opacity-5" />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Tu Arsenal</p>
          <h3 className="text-2xl font-black uppercase text-white tracking-tight">Carrito</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#CCFF00] text-black font-black text-sm shadow-lg shadow-[#CCFF00]/50">
            {totalItems}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#262626] hover:border-[#CCFF00] text-gray-300 hover:text-[#CCFF00] transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;