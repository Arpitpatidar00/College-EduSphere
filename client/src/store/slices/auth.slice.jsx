import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "../thunk/auth.thunk";

const initialState = {
  isAuthenticated: false,
  token: "",
  tokenExpiry: "",
  user: null,
  role: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      state.user = action.payload;
    },
    // This reducer can be used for immediate logout if needed.
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.tokenExpiry = "";
      state.user = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.isAuthenticated = true;
        const user = action.payload;
        state.user = user;
        state.token = user.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        // Reset auth state on successful logout
        state.isAuthenticated = false;
        state.token = "";
        state.tokenExpiry = "";
        state.user = null;
        state.role = null;
      });
  },
});

export const { updateUserState, logout } = authSlice.actions;

export const selectUserData = (state) => state.auth.user.user;
export const selectToken = (state) => state.auth.user.token;
export const selectAuthData = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.user.user.role;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
