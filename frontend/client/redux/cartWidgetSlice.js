import { createSlice } from '@reduxjs/toolkit';

const cartWidgetSlice = createSlice({
  name: 'cartWidget',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openCart: (state) => { state.isOpen = true; },
    closeCart: (state) => { state.isOpen = false; },
    toggleCart: (state) => { state.isOpen = !state.isOpen; },
  },
});

export const { openCart, closeCart, toggleCart } = cartWidgetSlice.actions;
export default cartWidgetSlice.reducer;
