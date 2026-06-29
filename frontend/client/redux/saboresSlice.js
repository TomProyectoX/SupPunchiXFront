import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchSabores = createAsyncThunk('sabores/fetchSabores', async (token) => {
    const { data } = await axios.get('http://localhost:4002/sabores', authHeaders(token));
    return data;
}, { condition: (_, { getState }) => getState().sabores.status === 'idle' });

export const addSabor = createAsyncThunk('sabores/addSabor', async ({ body, token }) => {
    const { data } = await axios.post('http://localhost:4002/sabores', body, authHeaders(token));
    return data;
});

export const updateSabor = createAsyncThunk('sabores/updateSabor', async ({ id, nombre, token }) => {
    await axios.put(`http://localhost:4002/sabores/${id}`, { nombre }, authHeaders(token));
    return { id, nombre };
});

export const deleteSabor = createAsyncThunk('sabores/deleteSabor', async ({ id, token }) => {
    await axios.delete(`http://localhost:4002/sabores/${id}`, authHeaders(token));
    return id;
});

const saboresSlice = createSlice({
  name: 'sabores',
  initialState: {
    sabores: [],
    error: null,
    loading: false,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSabores.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSabores.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.sabores = action.payload;
      })
      .addCase(fetchSabores.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      // ADD
      .addCase(addSabor.fulfilled, (state, action) => {
        state.sabores.push(action.payload);
      })
      // UPDATE
      .addCase(updateSabor.fulfilled, (state, action) => {
        const { id, nombre } = action.payload;
        const sabor = state.sabores.find((s) => s.idSabor === id);
        if (sabor) {
          sabor.nombre = nombre;
        }
      })
      // DELETE
      .addCase(deleteSabor.fulfilled, (state, action) => {
        state.sabores = state.sabores.filter((s) => s.idSabor !== action.payload);
      });
  },
});

export default saboresSlice.reducer;
