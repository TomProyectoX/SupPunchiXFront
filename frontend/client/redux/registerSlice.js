import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const postregister = createAsyncThunk('register/postregister', async (userData) => {
    const { data } = await axios.post('http://localhost:4002/auth/register', userData);
    return data;
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
      })
      .addCase(postregister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(postregister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;