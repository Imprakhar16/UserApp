import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authServices } from "../../service/authServices";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (rawBody, thunkAPI) => {
    try {
      const response = await authServices.resetPassword(rawBody);
      return response.data.message || "Password reset successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearResetPasswordState(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearResetPasswordState,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
