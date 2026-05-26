import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import CartContext from './CartContext';

const buildKey = (item) => `${item.idProducto}:${item.idSabor ?? '0'}`;

const normalizeCartItem = (item) => ({
  idCartItem: item.id,
  idProducto: item.productoVariante?.producto?.idProducto ?? null,
  nombre: item.productoVariante?.producto?.nombre ?? '',
  idSabor: item.productoVariante?.sabor?.idSabor ?? null,
  cantidad: item.cantidad ?? 0,
  precio: item.precio ?? 0,
  sabor: item.productoVariante?.sabor?.nombre ?? '',
  stock: item.productoVariante?.stock ?? null,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

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
      const normalized = productos.map((item) => normalizeCartItem(item));

      setCartItems(normalized);
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
  };

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

  const addItem = async (item) => {
    const payload = {
      idproducto: item.idProducto,
      idsabor: item.idSabor ?? null,
      cantidad: item.cantidad || 1,
    };

    try {
      const response = await fetchWithAuth(
        'http://localhost:4002/carritos',
        { method: 'POST', body: JSON.stringify(payload) },
        () => token,
        navigate
      );

      const body = await response.json().catch(() => ({}));
      const normalized = normalizeCartItem({
        id: body.id,
        productoVariante: {
          producto: {
            idProducto: item.idProducto,
            nombre: item.nombre ?? '',
          },
          sabor: {
            idSabor: item.idSabor ?? null,
            nombre: item.sabor ?? '',
          },
          stock: item.stock ?? null,
        },
        cantidad: body.cantidad ?? item.cantidad ?? 1,
        precio: body.precio ?? item.precio ?? 0,
      });

      setCartItems((prev) => {
        const key = buildKey(normalized);
        const existing = prev.find((p) => buildKey(p) === key);

        if (existing) {
          return prev.map((p) =>
            buildKey(p) === key
              ? {
                  ...p,
                  ...normalized,
                  cantidad: (p.cantidad || 0) + (normalized.cantidad || 1),
                }
              : p
          );
        }

        return [...prev, normalized];
      });

      return normalized;
    } catch (err) {
      console.error('Error agregando al carrito:', err);
      throw err;
    }
  };

  const updateItemQuantity = async (item, cantidad) => {
    try {
      const idCartItem = item.idCartItem;
      if (!idCartItem) {
        throw new Error('No existe idCartItem para actualizar stock');
      }
      const bodydata = {
        idproductcart: idCartItem,
        nuevoStock: cantidad,
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

      // Actualizamos el estado local si el backend respondió ok
      setCartItems((prev) =>
        prev
          .map((p) =>
            p.idProducto === item.idProducto && (p.idSabor ?? null) === (item.idSabor ?? null)
              ? { ...p, cantidad }
              : p
          )
          .filter((p) => (p.cantidad || 0) > 0)
      );

      return response;
    } catch (error) {
      console.error('Error actualizando carrito:', error);
    }
  };

  const removeItem = async (item) => {
    try {
      const idCartItem = item.idCartItem;
      if (!idCartItem) {
        throw new Error('No existe idCartItem para eliminar');
      }
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

    await loadCart();
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
