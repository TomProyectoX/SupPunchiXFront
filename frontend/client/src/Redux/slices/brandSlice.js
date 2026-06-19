import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/marcas";

export const fetchMarcas = createAsyncThunk("brands/fetchMarcas", async () => {
  const { data } = await axios.get(URL);
  return data;
});

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    marcas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarcas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarcas.fulfilled, (state, action) => {
        state.loading = false;
        state.marcas = action.payload;
      })
      .addCase(fetchMarcas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;