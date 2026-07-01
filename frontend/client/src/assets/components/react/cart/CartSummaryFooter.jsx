const CartSummaryFooter = ({ subtotal, descuento = 0, total = subtotal, onCheckout, onContinueShopping }) => {
  return (
    <div className="border-t border-[#262626] bg-gradient-to-t from-[#0A0A0A] to-transparent p-6 space-y-4">
      <div className="space-y-2 py-3 px-3 bg-[#141414] border border-[#262626] rounded-lg">
        <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
          <span>Subtotal</span>
          <span className="text-[#CCFF00]">${subtotal.toLocaleString('es-AR')}</span>
        </div>
        {descuento > 0 && (
          <div className="flex items-center justify-between text-xs text-[#CCFF00] font-bold uppercase">
            <span>Cupon</span>
            <span>-${descuento.toLocaleString('es-AR')}</span>
          </div>
        )}
        <div className="border-t border-[#262626] pt-2 mt-2 flex items-center justify-between">
          <span className="text-sm font-black uppercase text-white">Total</span>
          <span className="text-xl font-black text-[#CCFF00] shadow-lg shadow-[#CCFF00]/30">
            ${total.toLocaleString('es-AR')}
          </span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-[#CCFF00] to-[#E8FF66] text-black font-black uppercase py-3 rounded-lg hover:shadow-lg hover:shadow-[#CCFF00]/50 active:scale-95 transition transform"
      >
        Ir a finalizar compra
      </button>

      <button
        onClick={onContinueShopping}
        className="w-full border-2 border-[#CCFF00] text-[#CCFF00] font-black uppercase py-2.5 rounded-lg hover:bg-[#CCFF00]/10 transition"
      >
        Seguir Comprando
      </button>
    </div>
  );
};

export default CartSummaryFooter;
