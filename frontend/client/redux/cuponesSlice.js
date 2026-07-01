import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

const BASE_URL = 'http://localhost:4002/cupones';

export const fetchMisPuntos = createAsyncThunk('cupones/fetchMisPuntos', async (token) => {
  const { data } = await axios.get(`${BASE_URL}/mis-puntos`, authHeaders(token));
  return data;
});

export const fetchCupones = createAsyncThunk('cupones/fetchCupones', async (token) => {
  const { data } = await axios.get(BASE_URL, authHeaders(token));
  return data;
});

export const createCupon = createAsyncThunk('cupones/createCupon', async ({ body, token }) => {
    const { data } = await axios.post(BASE_URL, body, authHeaders(token));
    return data;
});

export const canjearCupon = createAsyncThunk('cupones/canjearCupon', async ({ id, token }) => {
    const { data } = await axios.post(`${BASE_URL}/${id}`, {}, authHeaders(token));
    return data;
}, {
  condition: (_, { getState }) => !getState().cupones.canjeandoId && !getState().cupones.cancelandoId,
});

export const cancelarCupon = createAsyncThunk('cupones/cancelarCupon', async ({ id, token }) => {
    const { data } = await axios.delete(`${BASE_URL}/${id}`, authHeaders(token));
    return data;
}, {
  condition: (_, { getState }) => !getState().cupones.cancelandoId && !getState().cupones.canjeandoId,
});

const cuponesSlice = createSlice({
  name: 'cupones',
  initialState: {
    cupones: [],
    cuponActivo: null,
    puntos: 0,
    error: null,
    loading: false,
    status: 'idle',
    canjeandoId: null,
    cancelandoId: null,
  },
  reducers: {
    clearCuponActivo: (state) => {
      state.cuponActivo = null;
    },
    clearCuponesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // MIS PUNTOS
      .addCase(fetchMisPuntos.fulfilled, (state, action) => {
        state.puntos = action.payload.puntos;
      })
      // FETCH
      .addCase(fetchCupones.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCupones.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.cupones = action.payload;
      })
      .addCase(fetchCupones.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      // CREATE
      .addCase(createCupon.fulfilled, (state, action) => {
        state.cupones.push(action.payload);
      })
      .addCase(createCupon.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // CANJEAR
      .addCase(canjearCupon.pending, (state, action) => {
        state.canjeandoId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(canjearCupon.fulfilled, (state, action) => {
        state.canjeandoId = null;
        state.cuponActivo = action.payload;
        state.puntos -= action.payload.costo;
        state.cupones = state.cupones.filter((cupon) => cupon.id !== action.payload.id);
        state.error = null;
      })
      .addCase(canjearCupon.rejected, (state, action) => {
        state.canjeandoId = null;
        state.error = action.payload || action.error.message;
      })
      // CANCELAR
      .addCase(cancelarCupon.pending, (state, action) => {
        state.cancelandoId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(cancelarCupon.fulfilled, (state, action) => {
        state.cancelandoId = null;
        state.puntos += action.payload.costo;
        state.cuponActivo = null;
        if (!state.cupones.some((cupon) => cupon.id === action.payload.id)) {
          state.cupones.push(action.payload);
        }
        state.error = null;
      })
      .addCase(cancelarCupon.rejected, (state, action) => {
        state.cancelandoId = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCuponActivo, clearCuponesError } = cuponesSlice.actions;
export default cuponesSlice.reducer;
