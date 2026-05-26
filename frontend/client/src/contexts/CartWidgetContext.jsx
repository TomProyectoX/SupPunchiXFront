import { createContext, useState } from 'react';

export const CartWidgetContext = createContext();

export const CartWidgetProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);

  return (
    <CartWidgetContext.Provider value={{ isOpen, toggleCart, closeCart, openCart }}>
      {children}
    </CartWidgetContext.Provider>
  );
};
