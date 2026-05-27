import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useCartWidget } from '../../../hooks/useCartWidget';

const CartWidget = () => {
  const navigate = useNavigate();
  const { cartItems, updateItemQuantity, removeItem, subtotal, totalItems } = useCart();
  const { isOpen, closeCart } = useCartWidget();

  const handleEdit = async (item, nextCantidad) => {
    try {
      const newCantidad = Number(nextCantidad);
      if (newCantidad <= 0) {
        removeItem(item);
      } else {
        updateItemQuantity(item, newCantidad);
      }
    } catch (e) {
      console.error('Error actualizando cantidad:', e);
    }
  };

  const handleDelete = async (item) => {
    try {
      removeItem(item);
    } catch (e) {
      console.error('Error eliminando item:', e);
    }
  };

  const total = subtotal;

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed right-0 top-0 h-screen z-50 w-full sm:w-[500px] bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-[#0A0A0A] border-l border-[#262626] shadow-2xl shadow-[#CCFF00]/5 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* HEADER CON GLOW */}
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
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#262626] hover:border-[#CCFF00] text-gray-300 hover:text-[#CCFF00] transition"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* ITEMS CONTAINER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6 text-center">
              <div className="text-6xl mb-4 opacity-50">📦</div>
              <p className="text-gray-400 font-bold uppercase tracking-wide">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm mt-2">Añade productos para comenzar</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.idProducto}-${item.idSabor ?? 0}`}
                  className="group bg-gradient-to-r from-[#141414] to-[#050505] border border-[#262626] hover:border-[#CCFF00] rounded-xl p-4 transition duration-300 hover:shadow-lg hover:shadow-[#CCFF00]/20"
                >
                  {/* ITEM HEADER */}
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
                      onClick={() => handleDelete(item)}
                      className="text-xs text-gray-400 hover:text-red-400 hover:bg-red-400/10 px-2 py-1 rounded transition font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {/* QUANTITY & PRICE */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center border border-[#262626] bg-[#0A0A0A] rounded-lg overflow-hidden hover:border-[#CCFF00] transition">
                      <button
                        onClick={() => handleEdit(item, (item.cantidad || 1) - 1)}
                        className="px-2.5 py-1.5 text-[#CCFF00] text-lg font-black hover:bg-[#262626] transition"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-black text-white min-w-8 text-center">
                        {item.cantidad || 1}
                      </span>
                      <button
                        onClick={() => handleEdit(item, (item.cantidad || 1) + 1)}
                        className="px-2.5 py-1.5 text-[#CCFF00] text-lg font-black hover:bg-[#262626] transition"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-black text-[#CCFF00] whitespace-nowrap">
                      ${Number(item.precio || 0).toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER CON RESUMEN Y BOTONES */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#262626] bg-gradient-to-t from-[#0A0A0A] to-transparent p-6 space-y-4">
            
            {/* RESUMEN */}
            <div className="space-y-2 py-3 px-3 bg-[#141414] border border-[#262626] rounded-lg">
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                <span>Subtotal</span>
                <span className="text-[#CCFF00]">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="border-t border-[#262626] pt-2 mt-2 flex items-center justify-between">
                <span className="text-sm font-black uppercase text-white">Total</span>
                <span className="text-xl font-black text-[#CCFF00] shadow-lg shadow-[#CCFF00]/30">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            {/* BOTONES */}
            <button
              onClick={() => {
                navigate('/checkout');
                closeCart();
              }}
              className="w-full bg-gradient-to-r from-[#CCFF00] to-[#E8FF66] text-black font-black uppercase py-3 rounded-lg hover:shadow-lg hover:shadow-[#CCFF00]/50 active:scale-95 transition transform"
            >
              Ir a Checkout
            </button>

            <button
              onClick={() => {
                navigate('/shop');
                closeCart();
              }}
              className="w-full border-2 border-[#CCFF00] text-[#CCFF00] font-black uppercase py-2.5 rounded-lg hover:bg-[#CCFF00]/10 transition"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CCFF00;
        }
      `}</style>
    </>
  );
};

export default CartWidget;
