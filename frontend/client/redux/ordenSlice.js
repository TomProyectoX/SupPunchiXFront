import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice';
import { cancelarCupon } from './cuponesSlice';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

const getToken = (payload) => typeof payload === 'string' ? payload : payload?.token;

export const fetchOrdenEnCurso = createAsyncThunk('orden/fetchOrdenEnCurso', async (payload) => {
    const response = await axios.get('http://localhost:4002/Ordenes/en-curso', authHeaders(getToken(payload)));
    return response.data;
}, { condition: (payload, { getState }) => payload?.force || getState().orden.status === 'idle' });

export const fetchHistorialOrdenes = createAsyncThunk('orden/fetchHistorialOrdenes', async (token) => {
    const { data } = await axios.get('http://localhost:4002/Ordenes/mis-ordenes', authHeaders(token));
    return data;
}, { condition: (_, { getState }) => getState().orden.historyStatus === 'idle' });

export const createOrden = createAsyncThunk('orden/createOrden', async ({ body, token }, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:4002/Ordenes', body, authHeaders(token));
      return data;
    } catch (error) {
      const mensaje = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(mensaje);
    }
});

export const deleteDetalleOrden = createAsyncThunk('orden/deleteDetalleOrden', async ({ id, cantidad, token }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:4002/Ordenes/${id}`, {
        ...authHeaders(token),
        data: { cantidad },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

const ordenSlice = createSlice({
  name: 'orden',
  initialState: {
    orden: null,
    historial: [],
    loading: false,
    status: 'idle',
    historyStatus: 'idle',
    error: null,
  },
  reducers: {
    clearOrden: (state) => {
      state.orden = null;
      state.status = 'idle';
      state.historyStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ORDEN EN CURSO
      .addCase(fetchOrdenEnCurso.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrdenEnCurso.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.orden = action.payload;
      })
      .addCase(fetchOrdenEnCurso.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
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
        state.error = null;
        if (state.orden) {
          state.orden.detalles = (state.orden.detalles || []).filter((d) => d.id !== action.payload);
        }
      })
      .addCase(deleteDetalleOrden.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // CANCELAR CUPON => quitar de la orden en curso
      .addCase(cancelarCupon.fulfilled, (state) => {
        if (state.orden) {
          state.orden.cupon = null;
        }
      })
      .addCase(fetchHistorialOrdenes.fulfilled, (state, action) => {
        state.historial = action.payload || [];
        state.historyStatus = 'succeeded';
      })
      .addCase(fetchHistorialOrdenes.pending, (state) => {
        state.historyStatus = 'loading';
      })
      .addCase(fetchHistorialOrdenes.rejected, (state) => {
        state.historyStatus = 'failed';
      })
      .addCase(logout, (state) => {
        state.orden = null;
        state.historial = [];
        state.error = null;
        state.status = 'idle';
        state.historyStatus = 'idle';
      });
  },
});

export const { clearOrden } = ordenSlice.actions;
export default ordenSlice.reducer;
