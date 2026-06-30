import { useLocation } from 'react-router-dom';
import CartWidget from './CartWidget';
import { useSelector } from 'react-redux';

const ConditionalCartWidget = () => {
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);

  // Páginas donde NO debe aparecer CartWidget
  const hiddenRoutes = ['/login', '/register', '/checkout', '/admin/products', '/admin/inventory', '/admin/catalog'];

  // El Home (en "/" y en "/home") muestra el chatbot en vez del carrito
  const isHomeRoute = location.pathname === '/' || location.pathname === '/home';

  // Verificar si la ruta actual comienza con /admin
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname.startsWith(route));

  // No mostrar en rutas ocultas
  if (isHiddenRoute || isAdminRoute || isHomeRoute || role === 'ADMIN') {
    return null;
  }

  return <CartWidget />;
};

export default ConditionalCartWidget;
