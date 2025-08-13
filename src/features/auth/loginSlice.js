import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authServices } from "../../service/authServices";
import { toast } from "react-toastify";

const token = localStorage.getItem("authToken");

const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await authServices.LoginUser(credentials);
    console.log(response);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: token || null,
    isLoggedIn: false,
    loading: true,
    error: null,
  },
  reducers: {
   

    logout(state) {
      (state.token = null),
        (state.error = null),
        localStorage.removeItem("authToken"),
        (state.isLoggedIn = false);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isLoggedIn = true),
          (state.token = action.payload.token);
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
   
        
        (state.error = action.payload), (state.loading = false);
      });
  },
});

export const { logout, clearError } = loginSlice.actions;
export default loginSlice.reducer;
export { login };
