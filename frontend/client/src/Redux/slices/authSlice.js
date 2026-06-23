import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LOGIN = "http://localhost:4002/auth/authenticate";
const URL_REGISTER = "http://localhost:4002/auth/register";
const URL_ME = "http://localhost:4002/auth/me";

const getAuthErrorMessage = (error, defaultMessage, context = 'generic') => {
  const status = error.response?.status;
  const responseData = error.response?.data;
  const backendMessage =
    responseData?.message ||
    responseData?.error ||
    responseData?.msg ||
    (typeof responseData === 'string' ? responseData : null);

  if (status === 401 || status === 403) {
    return context === 'login'
      ? 'Email o contraseña incorrecta, intente de nuevo.'
      : backendMessage || defaultMessage;
  }

  if (status === 409) {
    return backendMessage || 'El email ya está en uso. Por favor elige otro.';
  }

  if (status === 400) {
    return backendMessage || defaultMessage;
  }

  return backendMessage || error.message || defaultMessage;
};

const normalizeRejectedMessage = (payload, errorMessage, defaultMessage) => {
  const normalized = payload || errorMessage;
  if (!normalized || normalized === 'Rejected') {
    return defaultMessage;
  }
  return normalized;
};

export const loginUser = createAsyncThunk("auth/loginUser", async (credenciales, thunkAPI) => {
  try {
    const { data } = await axios.post(URL_LOGIN, credenciales);
    return data;
  } catch (error) {
    const payload = getAuthErrorMessage(error, 'Error al iniciar sesión.', 'login');
    return thunkAPI.rejectWithValue(payload);
  }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (nuevoUsuario, thunkAPI) => {
  try {
    const { data } = await axios.post(URL_REGISTER, nuevoUsuario);
    return data;
  } catch (error) {
    const payload = getAuthErrorMessage(error, 'Error al registrarse. Revisa los datos e intenta de nuevo.', 'register');
    return thunkAPI.rejectWithValue(payload);
  }
});

export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (token) => {
  const { data } = await axios.get(URL_ME, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeRejectedMessage(
          action.payload,
          action.error?.message,
          'Email o contraseña incorrecta, intente de nuevo.'
        );
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeRejectedMessage(
          action.payload,
          action.error?.message,
          'Error al registrarse. Revisa los datos e intenta de nuevo.'
        );
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.role = action.payload.role;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;