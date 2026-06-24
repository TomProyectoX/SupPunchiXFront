import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const BASE_URL = 'http://localhost:4002/promos';

// GET /promos
export const fetchPromos = createAsyncThunk('promos/fetchPromos', async (token) => {
  const { data } = await axios.get(BASE_URL, authHeaders(token));
  return data;
});

// GET /promos/:id
export const fetchPromoById = createAsyncThunk('promos/fetchPromoById', async ({ id, token }) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`, authHeaders(token));
  return data;
});

// POST /promos — body: { description, discount, productosIds }
export const createPromo = createAsyncThunk('promos/createPromo', async ({ body, token }) => {
  const { data } = await axios.post(BASE_URL, body, authHeaders(token));
  return data;
});

// PUT /promos/:id — body: { description, discount } (el backend NO acepta productosIds en el update)
export const updatePromo = createAsyncThunk('promos/updatePromo', async ({ id, body, token }) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, body, authHeaders(token));
  return data; // el backend devuelve la promo actualizada
});

// DELETE /promos/:id
export const deletePromo = createAsyncThunk('promos/deletePromo', async ({ id, token }) => {
  await axios.delete(`${BASE_URL}/${id}`, authHeaders(token));
  return id;
});

const promosSlice = createSlice({
  name: 'promos',
  initialState: {
    promos: [],
    selectedPromo: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPromo: (state) => {
      state.selectedPromo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchPromos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.loading = false;
        state.promos = action.payload;
      })
      .addCase(fetchPromos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH BY ID
      .addCase(fetchPromoById.fulfilled, (state, action) => {
        state.selectedPromo = action.payload;
      })

      // CREATE — el backend devuelve la promo creada completa
      .addCase(createPromo.fulfilled, (state, action) => {
        state.promos.push(action.payload);
      })

      // UPDATE — el backend devuelve la promo actualizada completa, la reemplazamos en el array
      .addCase(updatePromo.fulfilled, (state, action) => {
        const index = state.promos.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.promos[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.promos = state.promos.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearSelectedPromo } = promosSlice.actions;
export default promosSlice.reducer;