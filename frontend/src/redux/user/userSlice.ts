import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userThunks";
import { InitialUser, User } from "./types";

const initialState: InitialUser = {
    isAuth: false,
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
    user: null,
    balance: 0,
  };

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | unknown | null>) {
      state.error = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload? action.payload : "");
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload ? action.payload : "");
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    editBalance(state, action: PayloadAction<{ oldamount: number; newamount: number; type: "income" | "expense" }>) {
      const { oldamount, newamount, type } = action.payload;
      if (type === "income") {
        state.balance = state.balance - oldamount + newamount;
      } else if (type === "expense") {
        state.balance = state.balance + oldamount - newamount;
      }
    },
    changeBalance(state, action: PayloadAction<{ amount: number; type: "plus" | "minus" }>) {
      const { amount, type } = action.payload;
      if (type === "plus") {
        state.balance += amount;
      } else if (type === "minus") {
        state.balance -= amount;
      }
    },
    resetUserState(state) {
      state.isAuth = false;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      state.user = null;
      state.balance = 0;
      
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.error = null;
        state.user = {
          email: action.payload.email,
          name: action.payload.name,
          id: action.payload.id
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.balance = action.payload.balance;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.error = action.payload || action.error?.message || "Registration failed";
        
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.error = null;
        state.user = action.payload.user;
        state.balance = action.payload.balance;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.error = action.payload || action.error?.message || "Login failed";
        
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const {
  setIsAuth,
  setUser,
  setLoading,
  setError,
  setToken,
  setRefreshToken,
  setBalance,
  editBalance,
  changeBalance,
  resetUserState,
} = sessionSlice.actions;

export default sessionSlice.reducer;
