import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';

const CartWidget = ({ className = '' }) => {
  const navigate = useNavigate();
  const { cartItems, updateItemQuantity, removeItem, subtotal, totalItems } = useCart(); /// extraemos las propiedades del objeto

  const handleEdit = async (item, nextCantidad) => {
    try {
      // NOTE: If you have a backend endpoint for cart updates, call it here first.
      updateItemQuantity(item, Number(nextCantidad));
    } catch (e) {
      console.error('Error actualizando cantidad:', e);
    }
  };

  const handleDelete = async (item) => {

    try {
      // NOTE: If you have a backend endpoint for cart delete, call it here first.
      removeItem(item);
    } catch (e) {
      console.error('Error eliminando item:', e);
    }
  };

  return (
    <aside
      className={`fixed z-40 left-4 right-4 bottom-4 md:left-auto md:right-6 md:bottom-auto md:top-28 w-auto md:w-[360px] ${className}`}
    >
      <div className="rounded-2xl border border-[#262626] bg-[#0A0A0A] shadow-[0_0_35px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Carrito</p>
            <h3 className="text-lg font-black uppercase text-white">Tu seleccion</h3>
          </div>
          <span className="text-xs font-bold text-[#CCFF00]">{totalItems} items</span>
        </div>

        <div className="max-h-[320px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="px-5 py-6 text-sm text-gray-400">Carrito vacio</div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.idProducto}-${item.idSabor ?? 0}`} className="px-5 py-4 border-b border-[#262626]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">{item.sabor || 'Sabor'}</p>
                    <p className="text-sm font-black uppercase text-white leading-tight">
                      {item.nombre || 'Producto'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-xs text-gray-400 hover:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-[#262626] bg-[#111111]">
                    <button
                      onClick={() => handleEdit(item, (item.cantidad || 1) - 1)}
                      className="px-3 py-1 text-[#CCFF00] text-lg"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-bold text-white">{item.cantidad || 1}</span>
                    <button
                      onClick={() => handleEdit(item, (item.cantidad || 1) + 1)}
                      className="px-3 py-1 text-[#CCFF00] text-lg"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-black text-[#CCFF00]">
                    ${Number(item.precio || 0).toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-[#262626]">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span className="font-bold text-white">${subtotal.toLocaleString('es-AR')}</span>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="mt-4 w-full bg-[#CCFF00] text-black font-black uppercase py-3 rounded-lg hover:bg-white transition-colors"
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CartWidget;
