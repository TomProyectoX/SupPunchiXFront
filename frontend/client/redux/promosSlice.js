import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const fetchPromos = createAsyncThunk('promos/fetchPromos', async (token) => {
    const { data } = await axios.get('http://localhost:4002/promos', authHeaders(token));
    return data;
});

export const addPromo = createAsyncThunk('promos/addPromo', async ({ body, token }, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:4002/promos', body, authHeaders(token));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const updatePromo = createAsyncThunk('promos/updatePromo', async ({ id, body, token }, thunkAPI) => {
    try {
      const { data } = await axios.put(`http://localhost:4002/promos/${id}`, body, authHeaders(token));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const deletePromo = createAsyncThunk('promos/deletePromo', async ({ id, token }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:4002/promos/${id}`, authHeaders(token));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

const promosSlice = createSlice({
  name: 'promos',
  initialState: {
    promos: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(addPromo.fulfilled, (state, action) => {
        state.promos.push(action.payload);
      })
      .addCase(updatePromo.fulfilled, (state, action) => {
        const index = state.promos.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.promos[index] = action.payload;
        }
      })
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.promos = state.promos.filter((p) => p.id !== action.payload);
      });
  },
});

export default promosSlice.reducer;
