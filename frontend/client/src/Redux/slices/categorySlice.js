import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/categories";

export const fetchCategorias = createAsyncThunk("categories/fetchCategorias", async () => {
  const { data } = await axios.get(URL);
  return data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categorias: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;