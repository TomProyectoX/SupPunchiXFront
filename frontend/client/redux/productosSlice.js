import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateVarianteStock, deleteVariante } from './variantesSlice';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const fetchProductos = createAsyncThunk('productos/fetchProductos', async () => {
    const { data } = await axios.get('http://localhost:4002/productos');
    return data;
}, {
  condition: (_, { getState }) => getState().productos.status === 'idle',
});

export const fetchProductoById = createAsyncThunk('productos/fetchProductoById', async (id) => {
    const { data } = await axios.get(`http://localhost:4002/productos/${id}`);
    return data;
}, {
  condition: (id, { getState }) => {
    const state = getState().productos;
    return state.detailStatus !== 'loading' && /// un producto cargandose a la vez
      String(state.productoporid?.idProducto) !== String(id); /// si entras y salis del mismo productdetails no vuelve a cargar el mismo (chetado)
  },
});

export const addProducto = createAsyncThunk('productos/addProducto', async ({ body, token }) => {
    const { data } = await axios.post('http://localhost:4002/productos', body, authHeaders(token));
    return data;
});

export const updateProducto = createAsyncThunk('productos/updateProducto', async ({ id, body, token }) => {
    const { data } = await axios.put(`http://localhost:4002/productos/${id}`, body, authHeaders(token));
    return data;
});

export const deleteProducto = createAsyncThunk('productos/deleteProducto', async ({ id, token }) => {
    await axios.delete(`http://localhost:4002/productos/${id}`, authHeaders(token));
    return id;
});

const productosSlice = createSlice({
  name: 'productos',
  initialState: {
    productos: [],
    error: null,
    loading: false,
    status: 'idle',
    detailStatus: 'idle',
    productoporid: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProductos.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.productos = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      // ADD
      .addCase(addProducto.fulfilled, (state, action) => {
        state.productos.push(action.payload);
      })
      // UPDATE
      .addCase(updateProducto.fulfilled, (state, action) => {
        const index = state.productos.findIndex((p) => p.idProducto === action.payload.idProducto);
        if (index !== -1) {
          state.productos[index] = action.payload;
        }
      })
      // DELETE PRODUCTO
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.productos = state.productos.filter((p) => p.idProducto !== action.payload);
      })
      // UPDATE VARIANTE STOCK
      .addCase(updateVarianteStock.fulfilled, (state, action) => {
        const { id, stock, productoId } = action.payload;
        const producto = state.productos.find((p) => p.idProducto === productoId);
        if (producto) {
          const variante = producto.variantes.find((v) => v.id === id);
          if (variante) {
            variante.stock = stock;
          }
        }
      })
      // DELETE VARIANTE
      .addCase(deleteVariante.fulfilled, (state, action) => {
        const { varianteId, productoId } = action.payload;
        const producto = state.productos.find((p) => p.idProducto === productoId);
        if (producto) {
          producto.variantes = producto.variantes.filter((v) => v.id !== varianteId);
        }
      })
      .addCase(fetchProductoById.fulfilled, (state, action) => {
        state.productoporid = action.payload;
        const index = state.productos.findIndex((p) => p.idProducto === action.payload.idProducto);
        if (index >= 0) state.productos[index] = action.payload;
        state.detailStatus = 'succeeded';
      })
      .addCase(fetchProductoById.pending, (state) => {
        state.detailStatus = 'loading';
      })
      .addCase(fetchProductoById.rejected, (state) => {
        state.detailStatus = 'failed';
      });
  },
});

export default productosSlice.reducer;
