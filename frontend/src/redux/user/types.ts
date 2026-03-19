export interface User {
  email: string;
  name: string;
  id: string;
}

export interface InitialUser {
  isAuth: boolean;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | unknown | null;
  user: User | null;
  balance: number;
}

export interface AuthResponse extends User {
  token: string;
  refreshToken: string;
  balance: number;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  balance: number;
}

// Add these new types for API requests
export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface LogoutParams {
  id: string;
  token: string;
  refreshToken: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  status: string;
  code: number;
  data: T;
}