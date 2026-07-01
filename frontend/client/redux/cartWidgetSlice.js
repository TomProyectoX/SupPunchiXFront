import { createSlice } from '@reduxjs/toolkit';



/// como el widget del carrito necesita abrirse y cerrarse desde 3 componentes
/// lo que hicimos fue hacerlo un estado global para evitar pasarle un estado local 
/// por toda la pipeline
const cartWidgetSlice = createSlice({
  name: 'cartWidget',
  initialState: {
    isOpen: false, ///empieza cerrado
  },
  reducers: {
    openCart: (state) => { state.isOpen = true; },
    closeCart: (state) => { state.isOpen = false; },
    toggleCart: (state) => { state.isOpen = !state.isOpen; }, /// usando dispatch togglecart lo pueden abrir los componentes que quiera
  },
});

export const { openCart, closeCart, toggleCart } = cartWidgetSlice.actions;
export default cartWidgetSlice.reducer;
/// no se necesita ningun asyncthunk pq no hay ningun axios