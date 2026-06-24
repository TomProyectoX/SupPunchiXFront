import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const postregister = createAsyncThunk('register/postregister', async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:4002/auth/register', userData);
      return data;
    } catch (error) {
      const mensaje = error.response?.data?.message || error.response?.data || error.message;
      return thunkAPI.rejectWithValue(mensaje);
    }
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postregister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postregister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(postregister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default registerSlice.reducer;
