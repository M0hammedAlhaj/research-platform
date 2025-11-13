// User Type enum to match backend
export type UserType = 'RESEARCHER' | 'CONTRIBUTOR' | 'ADMIN';

// Register Request Model
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}

// Register Response Model (UserRegisterResponse from backend)
export interface RegisterResponse {
  id: string; // UUID from backend
  email: string;
  type: UserType; // matches backend 'type' field
}

// Login Request Model
export interface LoginRequest {
  email: string;
  password: string;
}

// Login Response Model - Backend returns string token directly
export type LoginResponse = string;

// User Model
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}