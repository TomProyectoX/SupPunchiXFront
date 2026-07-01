import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from "../../../../redux/cartWidgetSlice";

const CartToggleButton = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { items: cartItems } = useSelector((state) => state.carrito);
  const role = useSelector((state) => state.auth.role);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  }, [cartItems]);

  const hiddenRoutes = ['/login', '/register', '/checkout'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname.startsWith(route));
  const isHomeRoute = location.pathname === '/' || location.pathname === '/home';

  if (isHiddenRoute || isAdminRoute || isHomeRoute || role === 'ADMIN') {
    return null;
  }

  return (
    <button
      onClick={() => dispatch(toggleCart())} /// esto es lo que dispara el cambio de estado del widget y ejecuta despues todo lo que esta en cartwidget
      className="fixed right-6 bottom-6 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#CCFF00] to-[#E8FF66] text-black font-black flex items-center justify-center rounded-full shadow-xl shadow-[#CCFF00]/50 hover:shadow-2xl hover:shadow-[#CCFF00]/70 active:scale-95 transition-all duration-200 group"
    >
      <div className="relative flex items-center justify-center">
        <span
          className="material-symbols-outlined text-black group-hover:animate-[hop_0.5s_ease-in-out]"
          style={{ fontSize: "30px" }}
        >
          shopping_bag
        </span>

        {totalItems > 0 && (
          <span
            key={totalItems}
            className="absolute -top-2.5 -right-2.5 flex items-center justify-center min-w-[22px] h-[22px] px-1 bg-black text-[#CCFF00] text-xs font-black rounded-full border-2 border-[#CCFF00] animate-[bounce_0.5s_ease-in-out]"
          >
            {totalItems}
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
