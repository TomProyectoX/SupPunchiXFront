import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarrito, updateCarritoStock, removeFromCarrito } from '../../../../redux/carritoSlice';
import { closeCart } from '../../../../redux/cartWidgetSlice';
import { fetchPuntosMe, toggleUsarPuntos } from '../../../../redux/puntosSlice';
import { fetchOrdenEnCurso } from '../../../../redux/ordenSlice';
import UsarPuntosSwitch from './sidebar/UsarPuntosSwitch';
import CartHeader from './cart/CartHeader';
import CartItemCard from './cart/CartItemCard';
import OrdenPendienteCard from './cart/OrdenPendienteCard';
import CartSummaryFooter from './cart/CartSummaryFooter';
import DeleteConfirmModal from './cart/DeleteConfirmModal';

const PESOS_POR_PUNTO = 50;

const mapOrdenToItems = (orden) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.map((detalle) => {
        const productoRef = detalle.productoVariante?.producto;
        const saborRef = detalle.productoVariante?.sabor;
        return {
          idDetalle: detalle.id,
          nombre: productoRef?.nombre ?? 'Producto',
          sabor: saborRef?.nombre ?? '',
          cantidad: detalle.cantidad ?? 0,
          precio: detalle.precioUnitario ?? productoRef?.precioFinal ?? productoRef?.precio ?? 0,
        };
      })
    : [];

const CartWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.carrito);
  const { isOpen } = useSelector((state) => state.cartWidget);
  const { puntosActuales, usarPuntos } = useSelector((state) => state.puntos);
  const { orden } = useSelector((state) => state.orden);

  const [itemAEliminar, setItemAEliminar] = useState(null);

  useEffect(() => {
    if (token && isOpen) {
      dispatch(fetchCarrito(token));
      dispatch(fetchPuntosMe(token));
      dispatch(fetchOrdenEnCurso(token));
    }
  }, [dispatch, token, isOpen]);

  const itemsOrden = useMemo(() => mapOrdenToItems(orden), [orden]);

  const subtotalCarrito = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 0), 0);
  }, [cartItems]);

  const subtotalOrden = useMemo(() => {
    return itemsOrden.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 0), 0);
  }, [itemsOrden]);

  const subtotal = subtotalCarrito + subtotalOrden;

  const descuento = useMemo(() => {
    if (!usarPuntos) return 0;
    return Math.min(puntosActuales * PESOS_POR_PUNTO, subtotal);
  }, [usarPuntos, puntosActuales, subtotal]);

  const total = subtotal - descuento;

  const totalItems = useMemo(() => {
    const enCarrito = cartItems.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    const enOrden = itemsOrden.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    return enCarrito + enOrden;
  }, [cartItems, itemsOrden]);

  const handleEdit = (item, newCantidad) => {
    if (newCantidad <= 0) {
      setItemAEliminar(item);
      return;
    }
    dispatch(updateCarritoStock({ idproductcart: item.idCartItem, nuevoStock: newCantidad, token }));
  };

  const confirmarEliminar = () => {
    if (itemAEliminar) {
      dispatch(removeFromCarrito({ idproductcart: itemAEliminar.idCartItem, stock: itemAEliminar.stock, token }));
    }
    setItemAEliminar(null);
  };

  const handleCloseCart = () => dispatch(closeCart());

  const hayAlgo = cartItems.length > 0 || itemsOrden.length > 0;

  return (
    <>
      {isOpen && (
        <div
          onClick={handleCloseCart}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        />
      )}

      <div
        className={`fixed right-0 top-0 h-screen z-50 w-full sm:w-[500px] bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-[#0A0A0A] border-l border-[#262626] shadow-2xl shadow-[#CCFF00]/5 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CartHeader totalItems={totalItems} onClose={handleCloseCart} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!hayAlgo ? (
            <div className="h-full flex flex-col items-center justify-center px-6 text-center">
              <span className="material-symbols-outlined text-gray-600 text-5xl mb-4">shopping_bag</span>
              <p className="text-gray-400 font-bold uppercase tracking-wide">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm mt-2">Añade productos para comenzar</p>
            </div>
          ) : (
            <div className="p-4 space-y-5">

              {/* PRODUCTOS YA CONFIRMADOS EN UNA ORDEN */}
              {itemsOrden.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="material-symbols-outlined text-[#CCFF00] text-sm">verified</span>
                    <p className="text-xs uppercase font-black tracking-widest text-[#CCFF00]">
                      Ya confirmado en tu orden
                    </p>
                  </div>
                  <div className="space-y-3">
                    {itemsOrden.map((item) => (
                      <OrdenPendienteCard key={`orden-${item.idDetalle}`} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* CARRITO NUEVO */}
              {cartItems.length > 0 && (
                <div>
                  {itemsOrden.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className="material-symbols-outlined text-gray-400 text-sm">shopping_bag</span>
                      <p className="text-xs uppercase font-black tracking-widest text-gray-400">
                        Nuevo en el carrito
                      </p>
                    </div>
                  )}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <CartItemCard
                        key={`${item.idProducto}-${item.idSabor ?? 0}`}
                        item={item}
                        onEdit={handleEdit}
                        onDeleteRequest={setItemAEliminar}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {hayAlgo && (
          <div className="border-t border-[#262626] bg-gradient-to-t from-[#0A0A0A] to-transparent p-6 space-y-4">

            {/* Switch de puntos — solo si el usuario tiene puntos */}
            {token && puntosActuales > 0 && (
              <UsarPuntosSwitch
                puntosDisponibles={puntosActuales}
                usarPuntos={usarPuntos}
                onToggle={() => dispatch(toggleUsarPuntos())}
                subtotal={subtotal}
              />
            )}

            <div className="space-y-2 py-3 px-3 bg-[#141414] border border-[#262626] rounded-lg">
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString('es-AR')}</span>
              </div>

              {usarPuntos && descuento > 0 && (
                <div className="flex items-center justify-between text-xs font-bold uppercase text-[#CCFF00]">
                  <span>Descuento ({puntosActuales} pts × $50)</span>
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
              onClick={() => {
                navigate('/checkout');
                handleCloseCart();
              }}
              className="w-full bg-gradient-to-r from-[#CCFF00] to-[#E8FF66] text-black font-black uppercase py-3 rounded-lg hover:shadow-lg hover:shadow-[#CCFF00]/50 active:scale-95 transition transform"
            >
              Ir a Checkout
            </button>

            <button
              onClick={() => {
                navigate('/shop');
                handleCloseCart();
              }}
              className="w-full border-2 border-[#CCFF00] text-[#CCFF00] font-black uppercase py-2.5 rounded-lg hover:bg-[#CCFF00]/10 transition"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        item={itemAEliminar}
        onCancel={() => setItemAEliminar(null)}
        onConfirm={confirmarEliminar}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CCFF00; }
      `}</style>
    </>
  );
};

export default CartWidget;
