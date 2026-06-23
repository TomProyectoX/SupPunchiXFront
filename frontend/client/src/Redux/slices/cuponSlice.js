import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/cupones";

export const fetchCupones = createAsyncThunk("cupones/fetchCupones", async () => {
  const { data } = await axios.get(URL);
  // El backend devuelve List<CuponDTO> directo, no { cupones, puntos }
  return data;
});



export const canjearCupon = createAsyncThunk(  
  "cupones/canjearCupon",
  async ({ cuponId, userId, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/canjear`,
        { cuponId, usuarioId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
    error: null,
    canjeoError: null,
    canjeoExito: false,
  },
  reducers: {
    resetCanjeoExito: (state) => {
      state.canjeoExito = false;
      state.cuponCanjeado = null;
    },
    setPuntos: (state, action) => {
      state.puntos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCupones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCupones.fulfilled, (state, action) => {
        state.loading = false;
        state.cupones = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCupones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(canjearCupon.pending, (state) => {
        state.canjeoLoading = true;
        state.canjeoError = null;
        state.canjeoExito = false;
      })
      .addCase(canjearCupon.fulfilled, (state, action) => {
        state.canjeoLoading = false;
        state.cuponCanjeado = action.payload;
        state.canjeoExito = true;
        state.canjeoError = null;
      })
      .addCase(canjearCupon.rejected, (state, action) => {
        state.canjeoLoading = false;
        state.canjeoError = action.payload;
        state.canjeoExito = false;
      });
  },
});

export const { resetCanjeoExito, setPuntos } = cuponSlice.actions;
export default cuponSlice.reducer;