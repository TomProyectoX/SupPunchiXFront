import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const updateVarianteStock = createAsyncThunk('variantes/updateVarianteStock', async ({ id, stock, productoId, token }) => {
    await axios.put('http://localhost:4002/variantes/stock', { id, stock }, authHeaders(token));
    return { id, stock, productoId };
});

export const deleteVariante = createAsyncThunk('variantes/deleteVariante', async ({ varianteId, productoId, token }) => {
    await axios.delete(`http://localhost:4002/variantes/${varianteId}`, authHeaders(token));
    return { varianteId, productoId };
});

const variantesSlice = createSlice({
  name: 'variantes',
  initialState: {},
  reducers: {},
});

export default variantesSlice.reducer;
