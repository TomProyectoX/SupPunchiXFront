import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:4002/productos";

export const fetchProductos = createAsyncThunk(
  "products/fetchProductos",
  async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    productos: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProductos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })

      .addCase(fetchProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;