import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authServices } from "../../service/authServices";

// Async thunk
const verify = createAsyncThunk("auth/verify", async (body, thunkAPI) => {
  try {
    const { token, id } = body;
    console.log(token,"",id)
    const response = await authServices.verifyEmail(token, id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data || { message: "Verification failed" }
    );
  }
});

// Slice
const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState: {
    loading: false,
    error: null,
    verified: false,
  },
  reducers: {
    clearVerifyState(state) {
      state.loading = false;
      state.error = null;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verified = false;
      })
      .addCase(verify.fulfilled, (state) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(verify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verified = false;
      });
  },
});

export const { clearVerifyState } = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
export { verify };
