import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrden } from './ordenSlice';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

const normalizeItem = (item) => {
  const producto = item.productoVariante?.producto;
  const sabor = item.productoVariante?.sabor;

  return {
    idCartItem: item.id,
    idProducto: producto?.idProducto ?? null,
    nombre: producto?.nombre ?? '',
    idSabor: sabor?.idSabor ?? null,
    sabor: sabor?.nombre ?? '',
    cantidad: item.cantidad ?? 0,
    precio: producto?.precioFinal ?? producto?.precio ?? item.precio ?? 0,
    stock: item.productoVariante?.stock ?? null,
  };
};

export const fetchCarrito = createAsyncThunk('carrito/fetchCarrito', async (token) => {
    const { data } = await axios.get('http://localhost:4002/carritos', authHeaders(token));
    return data;
});

export const addToCarrito = createAsyncThunk('carrito/addToCarrito', async ({ body, token }, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:4002/carritos', body, authHeaders(token));
      return data;
    } catch (error) {
      const mensaje = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(mensaje);
    }
});

export const updateCarritoStock = createAsyncThunk('carrito/updateCarritoStock', async ({ idproductcart, nuevoStock, token }, thunkAPI) => {
    try {
      await axios.put('http://localhost:4002/carritos/stock', { idproductcart, nuevoStock }, authHeaders(token));
      return { idproductcart, nuevoStock };
    } catch (error) {
      const mensaje = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(mensaje);
    }
});

export const removeFromCarrito = createAsyncThunk('carrito/removeFromCarrito', async ({ idproductcart, stock, token }) => {
    await axios.delete('http://localhost:4002/carritos', {
      ...authHeaders(token),
      data: { idproductcart, stock },
    });
    return idproductcart;
});

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    items: [],
    total: 0,
    error: null,
    loading: false,
  },
  reducers: {
    clearCarritoError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCarrito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarrito.fulfilled, (state, action) => {
        state.loading = false;
        const productos = action.payload.productos ?? [];
        state.items = productos.map(normalizeItem);
        state.total = action.payload.total ?? 0;
      })
      .addCase(fetchCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ADD
      .addCase(addToCarrito.fulfilled, (state, action) => {
        state.error = null;
        const newItem = normalizeItem(action.payload);
        const existingIndex = state.items.findIndex((i) => i.idCartItem === newItem.idCartItem);
        if (existingIndex >= 0) {
          state.items[existingIndex] = newItem;
        } else {
          state.items.push(newItem);
        }
      })
      .addCase(addToCarrito.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // UPDATE STOCK
      .addCase(updateCarritoStock.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(updateCarritoStock.fulfilled, (state, action) => {
        const { idproductcart, nuevoStock } = action.payload;
        if (nuevoStock <= 0) {
          state.items = state.items.filter((i) => i.idCartItem !== idproductcart);
        } else {
          const item = state.items.find((i) => i.idCartItem === idproductcart);
          if (item) {
            item.cantidad = nuevoStock;
          }
        }
      })
      // REMOVE
      .addCase(removeFromCarrito.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.idCartItem !== action.payload);
      })
      // CREAR ORDEN => vaciar carrito
      .addCase(createOrden.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export const { clearCarritoError } = carritoSlice.actions;
export default carritoSlice.reducer;
