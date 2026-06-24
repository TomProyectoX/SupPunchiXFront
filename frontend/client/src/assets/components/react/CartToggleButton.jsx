import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCartWidget } from '../../../hooks/useCartWidget';
import { useCart } from '../../../hooks/useCart';
import { fetchWithAuth } from '../../../utils/fetchWithAuth';

const contarItemsOrden = (orden) =>
  Array.isArray(orden?.detalles)
    ? orden.detalles.reduce((acc, detalle) => acc + (detalle.cantidad || 0), 0)
    : 0;

const CartToggleButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { toggleCart } = useCartWidget();
  const { totalItems } = useCart();
  const [totalItemsOrden, setTotalItemsOrden] = useState(0);

  // Páginas donde NO debe aparecer el botón
  const hiddenRoutes = ['/login', '/register', '/checkout'];
  
  // Verificar si la ruta actual comienza con /admin
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname.startsWith(route));

  useEffect(() => {
    if (!token) return;

    const cargarOrdenEnCurso = async () => {
      try {
        const response = await fetchWithAuth(
          'http://localhost:4002/Ordenes/en-curso',
          { method: 'GET' },
          () => token,
          navigate
        );

        if (response.status === 204 || response.status === 404) {
          setTotalItemsOrden(0);
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setTotalItemsOrden(contarItemsOrden(data));
        }
      } catch (e) {
        console.error('Error cargando orden en curso en CartToggleButton:', e);
      }
    };

    cargarOrdenEnCurso();
  }, [token, navigate, location.pathname]);

  // No mostrar en rutas ocultas
  if (isHiddenRoute || isAdminRoute) {
    return null;
  }

  const totalItemsCompleto = totalItems + totalItemsOrden;

  return (
    <button
      onClick={toggleCart}
      className="fixed right-6 bottom-6 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#CCFF00] to-[#E8FF66] text-black font-black flex items-center justify-center rounded-full shadow-xl shadow-[#CCFF00]/50 hover:shadow-2xl hover:shadow-[#CCFF00]/70 active:scale-95 transition-all duration-200 group"
    >
      <div className="relative flex items-center justify-center">
        <span
          className="material-symbols-outlined text-black group-hover:animate-[hop_0.5s_ease-in-out]"
          style={{ fontSize: "30px" }}
        >
          shopping_bag
        </span>

        {totalItemsCompleto > 0 && (
          <span
            key={totalItemsCompleto}
            className="absolute -top-2.5 -right-2.5 flex items-center justify-center min-w-[22px] h-[22px] px-1 bg-black text-[#CCFF00] text-xs font-black rounded-full border-2 border-[#CCFF00] animate-[bounce_0.5s_ease-in-out]"
          >
            {totalItemsCompleto}
          </span>
        )}
      </div>

      <style>{`
        @keyframes hop {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
          50% { transform: translateY(0); }
          70% { transform: translateY(-2px); }
        }
      `}</style>
    </button>
  );
};

export default CartToggleButton;