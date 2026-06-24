import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:4002/puntos';

// GET /puntos/:usuarioId
export const fetchPuntos = createAsyncThunk('puntos/fetchPuntos', async ({ usuarioId, token }) => {
  const { data } = await axios.get(`${BASE_URL}/${usuarioId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
});

// GET /puntos/usuario/me — usa el token para identificar al usuario, sin necesitar el id
export const fetchPuntosMe = createAsyncThunk('puntos/fetchPuntosMe', async (token) => {
  const { data } = await axios.get(`${BASE_URL}/usuario/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
});

// POST /puntos/usar — body: { usuarioId, puntosAUsar, ordenId }
export const usarPuntos = createAsyncThunk('puntos/usarPuntos', async ({ body, token }) => {
  const { data } = await axios.post(`${BASE_URL}/usar`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
});

const puntosSlice = createSlice({
  name: 'puntos',
  initialState: {
    usuarioId: null,
    puntosActuales: 0,
    mensaje: null,
    usarPuntos: false, // toggle compartido entre Cart y CartWidget
    loading: false,
    error: null,
  },
  reducers: {
    // Lo usan Cart y CartWidget para prender/apagar el descuento
    toggleUsarPuntos: (state) => {
      state.usarPuntos = !state.usarPuntos;
    },
    // Lo usamos al hacer logout para resetear el toggle
    resetPuntos: (state) => {
      state.usarPuntos = false;
      state.puntosActuales = 0;
      state.usuarioId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPuntos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPuntos.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioId = action.payload.usuarioId;
        state.puntosActuales = action.payload.puntosActuales;
        state.mensaje = action.payload.mensaje;
      })
      .addCase(fetchPuntos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPuntosMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPuntosMe.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioId = action.payload.usuarioId;
        state.puntosActuales = action.payload.puntosActuales;
        state.mensaje = action.payload.mensaje;
      })
      .addCase(fetchPuntosMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(usarPuntos.fulfilled, (state, action) => {
        state.puntosActuales = action.payload.puntosActuales;
        state.mensaje = action.payload.mensaje;
        state.usarPuntos = false; // apagamos el toggle después de usar los puntos
      });
  },
});

export const { toggleUsarPuntos, resetPuntos } = puntosSlice.actions;
export default puntosSlice.reducer;
