import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { userServices } from "../../service/userServices";
import axiosInstance from "../../helper/axiosInterceptor";

export const fetchUserDetail = createAsyncThunk(
  "user/fetchUserDetail",
  async (id, thunkAPI) => {
    try {
      const response = await userServices.userDetail(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch user detail" }
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData }, thunkAPI) => {
    console.log(formData);
    try {
     
      const response = await axiosInstance.put(`user/${id}`, formData);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to update user" }
      );
    }
  }
);

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserDetailState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearUserDetailState } = userDetailSlice.actions;

export default userDetailSlice.reducer;
