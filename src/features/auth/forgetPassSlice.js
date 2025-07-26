import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authServices } from "../../service/authServices";

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (rawData, thunkAPI) => {
    try {
      const response = await authServices.forget(rawData);
      return response.data.message || "Verification link sent successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || "Sending verification link failed"
      );
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearForgetPasswordState(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearForgetPasswordState } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
