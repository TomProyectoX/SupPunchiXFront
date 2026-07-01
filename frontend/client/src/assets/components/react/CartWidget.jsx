import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarrito, updateCarritoStock, removeFromCarrito } from '../../../../redux/carritoSlice';
import { closeCart } from '../../../../redux/cartWidgetSlice';
import { fetchOrdenEnCurso } from '../../../../redux/ordenSlice';
import CartHeader from './cart/CartHeader';
import CartItemCard from './cart/CartItemCard';
import CuponItemCard from './cart/CuponItemCard';
import OrdenPendienteCard from './cart/OrdenPendienteCard';
import CartSummaryFooter from './cart/CartSummaryFooter';
import DeleteConfirmModal from './cart/DeleteConfirmModal';

const mapOrdenToItems = (orden) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.map((detalle) => {
        const productoRef = detalle.productoVariante?.producto;
        const saborRef = detalle.productoVariante?.sabor;
        return {
          idDetalle: detalle.id,
          idVariante: detalle.productoVariante?.id ?? null,
          nombre: productoRef?.nombre ?? 'Producto',
          sabor: saborRef?.nombre ?? '',
          cantidad: detalle.cantidad ?? 0,
          precio: detalle.precioUnitario ?? productoRef?.precioFinal ?? productoRef?.precio ?? 0,
          esGratis: Number(detalle.precioUnitario ?? productoRef?.precioFinal ?? productoRef?.precio ?? 0) === 0,
        };
      })
    : [];

const CartWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.carrito);
  const { isOpen } = useSelector((state) => state.cartWidget);
  const { orden } = useSelector((state) => state.orden);
  const cupon = useSelector((state) => state.orden.orden?.cupon || state.carrito.cupon);

  const [itemAEliminar, setItemAEliminar] = useState(null);

  useEffect(() => {
    if (token && isOpen) {
      dispatch(fetchCarrito(token));
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
  const descuentoCupon = cupon?.descuento != null
    ? subtotal * (Number(cupon.descuento) || 0) / 100
    : 0;
  const total = Math.max(subtotal - descuentoCupon, 0);

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

  const productosCupon = (cupon?.productos ?? []).filter((pv) =>
    !itemsOrden.some((item) => item.idVariante === pv.id && Number(item.precio || 0) === 0)
  );
  const hayAlgo = cartItems.length > 0 || itemsOrden.length > 0 || productosCupon.length > 0;

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

              {/* PRODUCTOS DE CUPON */}
              {productosCupon.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="material-symbols-outlined text-[#CCFF00] text-sm">redeem</span>
                    <p className="text-xs uppercase font-black tracking-widest text-[#CCFF00]">
                      Cupon canjeado
                    </p>
                  </div>
                  <div className="space-y-3">
                    {productosCupon.map((pv) => (
                      <CuponItemCard key={`cupon-${pv.id}`} producto={pv} />
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
          <CartSummaryFooter
            subtotal={subtotal}
            descuento={descuentoCupon}
            total={total}
            onCheckout={() => {
              navigate('/checkout');
              handleCloseCart();
            }}
            onContinueShopping={() => {
              navigate('/shop');
              handleCloseCart();
            }}
          />
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
