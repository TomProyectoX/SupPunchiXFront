import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


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

export const addToCarrito = createAsyncThunk('carrito/addToCarrito', async ({ body, token }) => {
    const { data } = await axios.post('http://localhost:4002/carritos', body, authHeaders(token));
    return data;
});

export const updateCarritoStock = createAsyncThunk('carrito/updateCarritoStock', async ({ idproductcart, nuevoStock, token }) => {
    await axios.put('http://localhost:4002/carritos/stock', { idproductcart, nuevoStock }, authHeaders(token));
    return { idproductcart, nuevoStock };
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
  reducers: {},
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
      // ADD - recargamos el carrito entero para tener los datos completos
      .addCase(addToCarrito.fulfilled, (state, action) => {
        // el POST devuelve el productocarrito creado, pero sin la data completa
        // marcamos para que el componente haga un refetch
        state.needsRefresh = true;
      })
      // UPDATE STOCK
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
      });
  },
});

export default carritoSlice.reducer;
