import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { resetUserState } from "../user/userSlice";
import { resetState } from "../transactions/transactionSlice";
import { resetCurrency } from "../currency/currencySlice";
import {
  RegisterUserParams,
  LoginUserParams,
  AuthResponse,
  LoginResponse,
  ApiResponse,
} from "./types";

export const registerUser = createAsyncThunk<AuthResponse, RegisterUserParams>(
  "user/register",
  async (userData: RegisterUserParams, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>("/register", userData);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        return rejectWithValue("Email already in use");
      }
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginUserParams>(
  "user/login",
  async (userData: LoginUserParams, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>("/login", userData);
      const { token, refreshToken, email, name, id, balance } = response.data.data;
      return { 
        user: { email: email, name: name, id: id }, 
        token: token, 
        refreshToken: refreshToken, 
        balance: balance 
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        return rejectWithValue("Invalid email or password");
      }
      return rejectWithValue("Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk<boolean, void>(
  "user/logout",
  async (_, { dispatch, getState }) => {
    const state = getState() as any;
    const { user, token, refreshToken } = state.session;
    
    try {
      await api.post("/logout", {
        id: user.id,
        token: token,
        refreshToken: refreshToken,
      });
      return true;
    } catch (error) {
      console.error("Error logging out user:", error);
      return false;
    } finally {
      dispatch(resetUserState());
      dispatch(resetState());
      dispatch(resetCurrency());
    }
  }
);
