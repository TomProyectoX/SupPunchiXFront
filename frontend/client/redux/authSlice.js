import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const postlogin = createAsyncThunk('auth/postlogin', async (credentials) => {
    const { data } = await axios.post('http://localhost:4002/auth/authenticate', credentials);
    return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    role: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postlogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postlogin.fulfilled, (state, action) => {
        state.loading = false;
        const raw = action.payload;
        const jwt = typeof raw === 'string' ? raw : raw.token || raw.jwtToken || raw.accessToken || raw.access_token || raw.jwt;
        state.token = jwt;
        state.role = typeof raw === 'object' ? (raw.role || 'USER') : 'USER';
      })
      .addCase(postlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
