import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authServices } from "../../service/authServices";
import { toast } from "react-toastify";

const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await authServices.register(credentials);
      return response.data;
    } catch (error) {
    toast.error("user is already exist")
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(registerUser.fulfilled, (state) => {
        (state.success = true), (state.loading = false), (state.error = null);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.error = action.payload), (state.loading = false);
      });
  },
});

export const { clearError } = registerSlice.actions;
export default registerSlice.reducer;
export { registerUser };
