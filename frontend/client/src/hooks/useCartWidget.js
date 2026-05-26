import { useContext } from 'react';
import { CartWidgetContext } from '../contexts/CartWidgetContext';

export const useCartWidget = () => {
  const context = useContext(CartWidgetContext);
  if (!context) {
    throw new Error('useCartWidget debe usarse dentro de CartWidgetProvider');
  }
  return context;
};
