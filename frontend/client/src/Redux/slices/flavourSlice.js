import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/sabores";

export const fetchSabores = createAsyncThunk("flavours/fetchSabores", async () => {
  const { data } = await axios.get(URL);
  return data;
});

const flavourSlice = createSlice({
  name: "flavours",
  initialState: {
    sabores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSabores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSabores.fulfilled, (state, action) => {
        state.loading = false;
        state.sabores = action.payload;
      })
      .addCase(fetchSabores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default flavourSlice.reducer;