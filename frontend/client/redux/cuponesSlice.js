import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

const BASE_URL = 'http://localhost:4002/cupones';

export const fetchCupones = createAsyncThunk('cupones/fetchCupones', async (token) => {
  const { data } = await axios.get(BASE_URL, authHeaders(token));
  return data;
});

export const createCupon = createAsyncThunk('cupones/createCupon', async ({ body, token }, thunkAPI) => {
  try {
    const { data } = await axios.post(BASE_URL, body, authHeaders(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const canjearCupon = createAsyncThunk('cupones/canjearCupon', async ({ id, token }, thunkAPI) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/${id}`, {}, authHeaders(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const cancelarCupon = createAsyncThunk('cupones/cancelarCupon', async ({ id, token }, thunkAPI) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${id}`, authHeaders(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const cuponesSlice = createSlice({
  name: 'cupones',
  initialState: {
    cupones: [],
    cuponActivo: null,
    error: null,
    loading: false,
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
      // FETCH
      .addCase(fetchCupones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCupones.fulfilled, (state, action) => {
        state.loading = false;
        state.cupones = action.payload;
      })
      .addCase(fetchCupones.rejected, (state, action) => {
        state.loading = false;
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
      .addCase(canjearCupon.fulfilled, (state, action) => {
        state.cuponActivo = action.payload;
        state.error = null;
      })
      .addCase(canjearCupon.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // CANCELAR
      .addCase(cancelarCupon.fulfilled, (state) => {
        state.cuponActivo = null;
        state.error = null;
      })
      .addCase(cancelarCupon.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCuponActivo, clearCuponesError } = cuponesSlice.actions;
export default cuponesSlice.reducer;
