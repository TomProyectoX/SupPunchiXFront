import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/cupones";

export const fetchCupones = createAsyncThunk("cupones/fetchCupones", async () => {
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    throw error.message;
  }
});

export const canjearCupon = createAsyncThunk(
  "cupones/canjearCupon",
  async ({ cuponId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/${cuponId}/canjear`, { usuarioId: userId });
      // Retorna { id, usuario, cupon, codigoUnico, puntos }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const crearCupon = createAsyncThunk(
  "cupones/crearCupon",
  async (cuponData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(URL, cuponData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cuponSlice = createSlice({
  name: "cupones",
  initialState: {
    cupones: [],
    cuponCanjeado: null,
    puntos: 0,
    loading: false,
    canjeoLoading: false,
    crearLoading: false,
    error: null,
    canjeoError: null,
    crearError: null,
    canjeoExito: false,
  },
  reducers: {
    resetCanjeoExito: (state) => {
      state.canjeoExito = false;
      state.cuponCanjeado = null;
    },
    clearError: (state) => {
      state.error = null;
      state.canjeoError = null;
      state.crearError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cupones
      .addCase(fetchCupones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCupones.fulfilled, (state, action) => {
        state.loading = false;
        state.cupones = action.payload.cupones || [];
        state.puntos = action.payload.puntos || 0;
      })
      .addCase(fetchCupones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Canjear Cupón
      .addCase(canjearCupon.pending, (state) => {
        state.canjeoLoading = true;
        state.canjeoError = null;
        state.canjeoExito = false;
      })
      .addCase(canjearCupon.fulfilled, (state, action) => {
        state.canjeoLoading = false;
        state.puntos = action.payload.puntos;
        state.cuponCanjeado = action.payload; // Guarda el cupón canjeado completo
        state.canjeoExito = true;
        state.canjeoError = null;
      })
      .addCase(canjearCupon.rejected, (state, action) => {
        state.canjeoLoading = false;
        state.canjeoError = action.payload;
        state.canjeoExito = false;
      })
      // Crear Cupón
      .addCase(crearCupon.pending, (state) => {
        state.crearLoading = true;
        state.crearError = null;
      })
      .addCase(crearCupon.fulfilled, (state, action) => {
        state.crearLoading = false;
        state.cupones.push(action.payload);
        state.crearError = null;
      })
      .addCase(crearCupon.rejected, (state, action) => {
        state.crearLoading = false;
        state.crearError = action.payload;
      });
  },
});

export const { resetCanjeoExito, clearError } = cuponSlice.actions;
export default cuponSlice.reducer;
