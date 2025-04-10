import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, signupThunk } from "../thunk/auth.thunk";

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
      // Update the nested user object
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateFollowState: (state, action) => {
      if (state.user) {
        state.user.follow = action.payload;
      }
    },
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
        state.user = action.payload.user; // This includes both user and token
        state.token = action.payload.token;
        state.role = action.payload.user.role; // Set role from nested user
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.error = null;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = "";
        state.tokenExpiry = "";
        state.user = null;
        state.role = null;
      });
  },
});

export const { updateUserState, updateFollowState, logout } = authSlice.actions;

export const selectUserData = (state) => state.auth?.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthData = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;