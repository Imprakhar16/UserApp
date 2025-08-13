import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, userServices } from "../../service/userServices";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ pageNumber, pageSize }, thunkAPI) => {
    try {
      const response = await userServices.userFetch(pageNumber, pageSize);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (id, thunkAPI) => {
    try {  
      const response = await userServices.deleteUser(id);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: true,
    totalUsers: 0,
    error: null,
  },
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload.data || [];
        state.totalUsers = action.payload.totalRecords || 0;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
