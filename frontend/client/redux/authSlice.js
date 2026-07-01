import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const postlogin = createAsyncThunk('auth/postlogin', async (credentials, { rejectWithValue }) => {  
  /// las credenciales se transforman en el objeto credenciales
  /// rejectwithvalue es una utilidad para manejar los errores
    try {
        const { data } = await axios.post('http://localhost:4002/auth/authenticate', credentials);
        return data;
    } catch (err) {
        const status = err.response?.status;
        if (status === 401 || status === 403) return rejectWithValue('Usuario o contraseña incorrectos.');
        if (status === 404) return rejectWithValue('No se encontró ningún usuario con ese email.');
        return rejectWithValue('No se pudo iniciar sesión. Intentá de nuevo.');
    }
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
    clearError: (state) => {
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
        state.error = action.payload ?? 'No se pudo iniciar sesión. Intentá de nuevo.';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
