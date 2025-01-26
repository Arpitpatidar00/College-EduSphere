import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginApi } from "../../services/api/auth.service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, endpoint }, { rejectWithValue }) => {
    try {
      const user = await userLoginApi({ email, password }, endpoint);

      if (!user) {
        throw new Error("Login failed!");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
