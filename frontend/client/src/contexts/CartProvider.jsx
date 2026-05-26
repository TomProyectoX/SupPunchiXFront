import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import CartContext from './CartContext';

const buildKey = (item) => `${item.idProducto}:${item.idSabor ?? '0'}`;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      if (!token) return;

      try {
        // TODO: Reemplazar URL si tu endpoint de carrito es distinto.
        const response = await fetchWithAuth(
          'http://localhost:4002/carritos',
          { method: 'GET' },
          () => token,
          navigate
        );
        const data = await response.json();
        const productos = Array.isArray(data?.productos) ? data.productos : [];

        const normalized = productos.map((item) => ({
          // id del item en el carrito (para delete/update en backend)
          idCartItem: item.id,
          // id real del producto (para UI y keys)
          idProducto: item.productoVariante?.producto?.idProducto ?? item.id,
          nombre: item.productoVariante?.producto?.nombre ?? '',
          idSabor: item.productoVariante?.sabor?.idSabor ?? null,
          cantidad: item.cantidad ?? 0,
          precio: item.productoVariante?.producto?.precio ?? 0,
          sabor: item.productoVariante?.sabor?.nombre ?? '',
          stock: item.productoVariante?.stock ?? null,
        }));

        setCartItems(normalized);
        console.log(data)
      } catch (error) {
        console.error('Error cargando carrito:', error);
      }
    };

    loadCart();
  }, [token, navigate]);

  const addItem = (item) => {
    // Merge by product + flavor (idProducto + idSabor)
    setCartItems((prev) => {
      const key = buildKey(item);
      const existing = prev.find((p) => buildKey(p) === key);

      if (existing) {
        return prev.map((p) =>
          buildKey(p) === key
            ? { ...p, cantidad: (p.cantidad || 0) + (item.cantidad || 1) }
            : p
        );
      }

      return [...prev, { ...item, cantidad: item.cantidad || 1 }];
    });
  };

  const updateItemQuantity = async (item, cantidad) => {
    try {
      const normalizedCantidad = Math.max(1, Number(cantidad) || 1);
      const idCartItem = item.idCartItem ?? item.idProducto; // fallback si no viene idCartItem
      const bodydata = {
        idproductcart: idCartItem,
        nuevoStock: normalizedCantidad,
      };

      const response = await fetchWithAuth(
        'http://localhost:4002/carritos/stock',
        {
          method: 'PUT',
          body: JSON.stringify(bodydata),
        },
        () => token,
        navigate
      );

      if (!response.ok) {
        throw new Error(`Error actualizando stock del carrito: ${response.status}`);
      }

      // Actualizamos el estado local si el backend respondió ok
      setCartItems((prev) =>
        prev
          .map((p) =>
            p.idProducto === item.idProducto && (p.idSabor ?? null) === (item.idSabor ?? null)
              ? { ...p, cantidad: normalizedCantidad }
              : p
          )
          .filter((p) => (p.cantidad || 0) > 0)
      );
    } catch (error) {
      console.error('Error actualizando carrito:', error);
    }
  };

  const removeItem = async (item) => {
    try {
      const idCartItem = item.idCartItem ?? item.idProducto; // fallback si no viene idCartItem
      const bodydata = {
        stock: item.stock,
        idproductcart: idCartItem,
      };

      const response = await fetchWithAuth(
        'http://localhost:4002/carritos',
        {
          method: 'DELETE',
          body: JSON.stringify(bodydata),
        },
        () => token,
        navigate
      );

      if (!response.ok) {
        throw new Error('Error eliminando item del carrito');
      }
    } catch (e) {
      console.log(e);
    }

    setCartItems((prev) =>
      prev.filter(
        (p) => !(p.idProducto === item.idProducto && (p.idSabor ?? null) === (item.idSabor ?? null))
      )
    );
  };


  const clearCart = () => setCartItems([]);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + (Number(item.precio) || 0) * (item.cantidad || 0),
      0
    );
    const totalItems = cartItems.reduce((acc, item) => acc + (item.cantidad || 0), 0);

    return { subtotal, totalItems };
  }, [cartItems]);

  return (
    <CartContext.Provider ///metemos todo esto en el context
      value={{
        cartItems,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        subtotal: totals.subtotal,
        totalItems: totals.totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
