import { useLocation } from 'react-router-dom';
import CartWidget from './CartWidget';

const ConditionalCartWidget = () => {
  const location = useLocation();

  // Páginas donde NO debe aparecer CartWidget
  const hiddenRoutes = ['/login', '/register', '/admin/products', '/admin/inventory', '/admin/catalog'];
  
  // Verificar si la ruta actual comienza con /admin
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname.startsWith(route));

  // No mostrar en rutas ocultas
  if (isHiddenRoute || isAdminRoute) {
    return null;
  }

  return <CartWidget />;
};

export default ConditionalCartWidget;
