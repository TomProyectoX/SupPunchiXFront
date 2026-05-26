import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const recommendations = [
  { id: 'rec-1', name: 'Titan Shaker 700ml', price: 199.99, tag: 'Essential' },
  { id: 'rec-2', name: 'Elite Lifting Straps', price: 44.99, tag: 'Grip' },
  { id: 'rec-3', name: 'Pro Leather Belt', price: 64.99, tag: 'Support' },
  { id: 'rec-4', name: 'Neoprene Knee Sleeves', price: 49.99, tag: 'Recovery' },
];

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateItemQuantity, removeItem, subtotal } = useCart();

  const handleEdit = async (item, nextCantidad) => {
    try {
      updateItemQuantity(item, Number(nextCantidad));
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

  const shipping = subtotal > 0 ? 0 : 0;
  const promo = subtotal > 0 ? 15 : 0;
  const total = Math.max(subtotal - promo + shipping, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: cart items */}
          <div className="flex-1">
            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl md:text-5xl font-black uppercase">Your Arsenal</h1>
              <span className="text-gray-500 text-sm">({cartItems.length})</span>
            </div>

            <div className="mt-8 space-y-4">
              {cartItems.length === 0 ? (
                <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6 text-gray-400">
                  Tu carrito esta vacio.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.idProducto}-${item.idSabor ?? 0}`}
                    className="rounded-2xl border border-[#262626] bg-[#111111] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-[#141414] border border-[#262626]" />
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">{item.sabor || 'Flavor'}</p>
                        <h3 className="text-lg font-black uppercase">{item.nombre || 'Producto'}</h3>
                        <p className="text-xs text-gray-500">ID Producto: {item.idProducto}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#262626] bg-[#0A0A0A]">
                        <button
                          onClick={() => handleEdit(item, (item.cantidad || 1) - 1)}
                          className="px-3 py-1 text-[#CCFF00] text-lg"
                        >
                          -
                        </button>
                        <span className="px-4 text-sm font-bold">{item.cantidad || 1}</span>
                        <button
                          onClick={() => handleEdit(item, (item.cantidad || 1) + 1)}
                          className="px-3 py-1 text-[#CCFF00] text-lg"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-lg font-black text-[#CCFF00]">
                        ${Number((item.productoVariante?.producto?.precio || item.precio || 0) * (item.cantidad || 0)).toLocaleString('es-AR')}
                      </span>

                      <button
                        onClick={() => handleDelete(item)}
                        className="text-xs text-gray-400 hover:text-red-400"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: summary */}
          <div className="w-full lg:w-[360px]">
            <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5">
              <h2 className="text-sm uppercase text-gray-400">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-[#CCFF00]">Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Promo</span>
                  <span className="text-red-400">-${promo.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-5 border-t border-[#262626] pt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <span className="text-2xl font-black text-[#CCFF00]">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
                className={`mt-5 w-full font-black uppercase py-3 rounded-lg transition-colors ${
                  cartItems.length === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-[#CCFF00] text-black hover:bg-white'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black uppercase">Don't forget these</h2>
            <span className="text-xs text-[#CCFF00] uppercase">(add to your order)</span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#262626] bg-[#111111] p-4">
                <span className="text-[10px] uppercase text-[#CCFF00]">{item.tag}</span>
                <div className="mt-3 h-28 w-full bg-[#141414] border border-[#262626]" />
                <h3 className="mt-4 text-sm font-black uppercase">{item.name}</h3>
                <p className="text-sm text-[#CCFF00] font-bold mt-2">${item.price}</p>
                <button className="mt-4 w-full border border-[#262626] text-xs uppercase py-2 hover:border-[#CCFF00] transition-colors">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
