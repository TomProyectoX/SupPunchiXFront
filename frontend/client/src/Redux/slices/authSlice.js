import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LOGIN = "http://localhost:4002/auth/authenticate";
const URL_REGISTER = "http://localhost:4002/auth/register";
const URL_ME = "http://localhost:4002/auth/me";

export const loginUser = createAsyncThunk("auth/loginUser", async (credenciales) => {
  const { data } = await axios.post(URL_LOGIN, credenciales);
  return data;
});

export const registerUser = createAsyncThunk("auth/registerUser", async (nuevoUsuario) => {
  const { data } = await axios.post(URL_REGISTER, nuevoUsuario);
  return data;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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