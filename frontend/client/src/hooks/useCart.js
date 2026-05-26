import { useContext } from 'react';
import CartContext from '../contexts/CartContext';

export const useCart = () => { //esto es la puerta de entrada hacia el context
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }

  return context;
};
