import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async (token) => {
    const { data } = await axios.get('http://localhost:4002/categories', authHeaders(token));
    return data;
}, { condition: (_, { getState }) => getState().categorias.status === 'idle' });

export const addCategoria = createAsyncThunk('categorias/addCategoria', async ({ body, token }) => {
    const { data } = await axios.post('http://localhost:4002/categories', body, authHeaders(token));
    return data;
});

export const updateCategoria = createAsyncThunk('categorias/updateCategoria', async ({ id, description, token }) => {
    await axios.put(`http://localhost:4002/categories/${id}`, { description }, authHeaders(token));
    return { id, description };
});

export const deleteCategoria = createAsyncThunk('categorias/deleteCategoria', async ({ id, token }) => {
    await axios.delete(`http://localhost:4002/categories/${id}`, authHeaders(token));
    return id;
});

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState: {
    categorias: [],
    error: null,
    loading: false,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      // ADD
      .addCase(addCategoria.fulfilled, (state, action) => {
        state.categorias.push(action.payload);
      })
      // UPDATE
      .addCase(updateCategoria.fulfilled, (state, action) => {
        const { id, description } = action.payload;
        const categoria = state.categorias.find((c) => c.id === id);
        if (categoria) {
          categoria.description = description;
        }
      })
      // DELETE
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.categorias = state.categorias.filter((c) => c.id !== action.payload);
      });
  },
});

export default categoriasSlice.reducer;
