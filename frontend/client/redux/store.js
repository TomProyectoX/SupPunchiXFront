import { configureStore } from '@reduxjs/toolkit';
import productosSlice from './productosSlice';
import registerSlice from './registerSlice';
import authSlice from './authSlice';
import categoriasSlice from './categoriasSlice';
import marcasSlice from './marcasSlice';
import saboresSlice from './saboresSlice';
import variantesSlice from './variantesSlice';
import carritoSlice from './carritoSlice';
import cartWidgetSlice from './cartWidgetSlice';
import ordenSlice from './ordenSlice';


export const store = configureStore({
  reducer: {
    productos: productosSlice,
    register: registerSlice,
    auth: authSlice,
    categorias: categoriasSlice,
    marcas: marcasSlice,
    sabores: saboresSlice,
    variantes: variantesSlice,
    carrito: carritoSlice,
    cartWidget: cartWidgetSlice,
    orden: ordenSlice,
  },
});
