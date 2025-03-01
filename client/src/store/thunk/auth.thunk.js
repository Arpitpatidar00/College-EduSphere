import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../enums/AuthConstants";
import { LoginApi, SignupApi } from "../../services/api/Auth/auth.service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const endpointMapping = {
        [UserType.ADMIN]: "adminLogin",
        [UserType.COLLEGE]: "collegeLogin",
        [UserType.STUDENT]: "studentLogin",
      };

      const endpoint = endpointMapping[role];

      const user = await LoginApi({ email, password }, endpoint);

      if (!user) {
        throw new Error("Login failed!");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async ({ role, ...additionalData }, { rejectWithValue }) => {
    try {
      // Define endpoint mapping for signup based on role
      const endpointMapping = {
        [UserType.ADMIN]: "adminSignup",
        [UserType.COLLEGE]: "collegeSignup",
        [UserType.STUDENT]: "studentSignup",
      };

      const endpoint = endpointMapping[role] || "studentSignup";

      const user = await SignupApi({ ...additionalData }, endpoint);

      if (!user) {
        throw new Error("Signup failed!");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("state");
      sessionStorage.clear();
      return true;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
