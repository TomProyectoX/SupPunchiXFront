import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchMarcas = createAsyncThunk('marcas/fetchMarcas', async (token) => {
    const { data } = await axios.get('http://localhost:4002/marcas', authHeaders(token));
    return data;
}, { condition: (_, { getState }) => getState().marcas.status === 'idle' });

export const addMarca = createAsyncThunk('marcas/addMarca', async ({ body, token }) => {
    const { data } = await axios.post('http://localhost:4002/marcas', body, authHeaders(token));
    return data;
});

export const updateMarca = createAsyncThunk('marcas/updateMarca', async ({ id, nombre, token }) => {
    await axios.put(`http://localhost:4002/marcas/${id}`, { nombre }, authHeaders(token));
    return { id, nombre };
});

export const deleteMarca = createAsyncThunk('marcas/deleteMarca', async ({ id, token }) => {
    await axios.delete(`http://localhost:4002/marcas/${id}`, authHeaders(token));
    return id;
});

const marcasSlice = createSlice({
  name: 'marcas',
  initialState: {
    marcas: [],
    error: null,
    loading: false,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchMarcas.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMarcas.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.marcas = action.payload;
      })
      .addCase(fetchMarcas.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      // ADD
      .addCase(addMarca.fulfilled, (state, action) => {
        state.marcas.push(action.payload);
      })
      // UPDATE
      .addCase(updateMarca.fulfilled, (state, action) => {
        const { id, nombre } = action.payload;
        const marca = state.marcas.find((m) => m.idMarca === id);
        if (marca) {
          marca.nombre = nombre;
        }
      })
      // DELETE
      .addCase(deleteMarca.fulfilled, (state, action) => {
        state.marcas = state.marcas.filter((m) => m.idMarca !== action.payload);
      });
  },
});

export default marcasSlice.reducer;
