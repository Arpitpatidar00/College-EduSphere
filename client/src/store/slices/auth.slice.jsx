import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/auth.thunk";

const initialState = {
  isAuthenticated: false,
  token: "",
  tokenExpiry: "",
  user: null,
  userRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.tokenExpiry = "";
      state.user = null;
      state.userRole = null;
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
      });
  },
});

export const { updateUserState, logout } = authSlice.actions;

// @ Selectors
export const selectUserData = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthData = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.userRole;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
