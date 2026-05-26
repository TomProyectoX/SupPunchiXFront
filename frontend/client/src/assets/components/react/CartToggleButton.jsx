import { useLocation } from 'react-router-dom';
import { useCartWidget } from '../../../hooks/useCartWidget';
import { useCart } from '../../../hooks/useCart';

const CartToggleButton = () => {
  const location = useLocation();
  const { toggleCart } = useCartWidget();
  const { totalItems } = useCart();

  // Páginas donde NO debe aparecer el botón
  const hiddenRoutes = ['/login', '/register'];
  
  // Verificar si la ruta actual comienza con /admin
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname.startsWith(route));

  // No mostrar en rutas ocultas
  if (isHiddenRoute || isAdminRoute) {
    return null;
  }

  return (
    <button
      onClick={toggleCart}
      className="fixed right-6 bottom-6 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#CCFF00] to-[#E8FF66] text-black font-black flex items-center justify-center rounded-full shadow-xl shadow-[#CCFF00]/50 hover:shadow-2xl hover:shadow-[#CCFF00]/70 hover:scale-110 active:scale-95 transition-all duration-200"
    >
      <div className="flex flex-col items-center gap-0.5">
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 4V3c0-.552-.448-1-1-1s-1 .448-1 1v1H4c-.552 0-1 .448-1 1v16c0 .552.448 1 1 1h16c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1h-1V3c0-.552-.448-1-1-1s-1 .448-1 1v1H7zm13 18H4V8h16v14z" />
        </svg>
        {totalItems > 0 && (
          <span className="text-[10px] font-black leading-none">{totalItems}</span>
        )}
      </div>
    </button>
  );
};

export default CartToggleButton;
