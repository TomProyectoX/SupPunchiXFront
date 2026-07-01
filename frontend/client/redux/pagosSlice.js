import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const BASE_URL = 'http://localhost:4002/pagos';

const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const fetchPagos = createAsyncThunk('pagos/fetchPagos', async (token) => {
  const { data } = await axios.get(BASE_URL, authHeaders(token));
  return data;
});

export const fetchPagoById = createAsyncThunk('pagos/fetchPagoById', async ({ id, token }) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`, authHeaders(token));
  return data;
});

export const fetchPagoByOrden = createAsyncThunk('pagos/fetchPagoByOrden', async ({ ordenId, token }) => {
  const { data } = await axios.get(`${BASE_URL}/orden/${ordenId}`, authHeaders(token));
  return data;
});

export const createPago = createAsyncThunk('pagos/createPago', async ({ body, token }) => {
    const { data } = await axios.post(BASE_URL, body, authHeaders(token));
    return data;
});

const pagosSlice = createSlice({
  name: 'pagos',
  initialState: { pago: null, pagos: [], pagosPorOrden: {}, status: 'idle', error: null },
  reducers: { clearPago: (state) => { state.pago = null; state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPagos.fulfilled, (state, action) => { state.pagos = action.payload || []; })
      .addCase(fetchPagoById.fulfilled, (state, action) => { state.pago = action.payload; })
      .addCase(fetchPagoByOrden.fulfilled, (state, action) => { state.pago = action.payload || null; state.pagosPorOrden[action.meta.arg.ordenId] = action.payload || null; })
      .addCase(createPago.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(createPago.fulfilled, (state, action) => { state.status = 'succeeded'; state.pago = action.payload; if (action.payload?.ordenId) state.pagosPorOrden[action.payload.ordenId] = action.payload; })
      .addCase(createPago.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || action.error.message; })
      .addCase(logout, (state) => { state.pago = null; state.pagos = []; state.pagosPorOrden = {}; state.status = 'idle'; state.error = null; });
  },
});

export const { clearPago } = pagosSlice.actions;
export default pagosSlice.reducer;
