import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const fetchOrdenEnCurso = createAsyncThunk('orden/fetchOrdenEnCurso', async (token) => {
    const response = await axios.get('http://localhost:4002/Ordenes/en-curso', authHeaders(token));
    return response.data;
});

export const createOrden = createAsyncThunk('orden/createOrden', async ({ body, token }, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:4002/Ordenes', body, authHeaders(token));
      return data;
    } catch (error) {
      const mensaje = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(mensaje);
    }
});

export const deleteDetalleOrden = createAsyncThunk('orden/deleteDetalleOrden', async ({ id, cantidad, token }) => {
    await axios.delete(`http://localhost:4002/Ordenes/${id}`, {
      ...authHeaders(token),
      data: { cantidad },
    });
    return id;
});

export const procesarPago = createAsyncThunk('orden/procesarPago', async ({ body, token }) => {
    const { data } = await axios.post('http://localhost:4002/pagos', body, authHeaders(token));
    return data;
});

const ordenSlice = createSlice({
  name: 'orden',
  initialState: {
    orden: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrden: (state) => {
      state.orden = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ORDEN EN CURSO
      .addCase(fetchOrdenEnCurso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdenEnCurso.fulfilled, (state, action) => {
        state.loading = false;
        state.orden = action.payload;
      })
      .addCase(fetchOrdenEnCurso.rejected, (state, action) => {
        state.loading = false;
        // 204 no content = no hay orden, no es un error
        if (action.error.message?.includes('204') || action.error.message?.includes('Request failed with status code 204')) {
          state.orden = null;
        } else {
          state.error = action.error.message;
        }
      })
      // CREATE ORDEN
      .addCase(createOrden.fulfilled, (state, action) => {
        state.orden = action.payload;
      })
      // DELETE DETALLE
      .addCase(deleteDetalleOrden.fulfilled, (state, action) => {
        if (state.orden) {
          state.orden.detalles = (state.orden.detalles || []).filter((d) => d.id !== action.payload);
        }
      })
      // PAGO
      .addCase(procesarPago.fulfilled, (state) => {
        state.orden = null;
      });
  },
});

export const { clearOrden } = ordenSlice.actions;
export default ordenSlice.reducer;
