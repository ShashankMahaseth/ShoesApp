import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  signupThunk,
  forgotThunk,
  logoutThunk,
} from "../thunk/AuthThunk";
import { sessionUseCases } from "../../core/session/sessionModule";

type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

interface AuthState {
  status: AuthStatus;
  error: string | null;
  isLoggedIn: boolean;
}

const sessionSnapshot = sessionUseCases.getStatus.execute();
const initialState: AuthState = {
  status: sessionSnapshot.isLoggedIn ? "authenticated" : "unauthenticated",
  error: null,
  isLoggedIn: sessionSnapshot.isLoggedIn,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const isAuthed = Boolean(action.payload);
        state.status = isAuthed ? "authenticated" : "unauthenticated";
        state.isLoggedIn = isAuthed;
        sessionUseCases.setLoggedIn.execute(isAuthed);
        if (isAuthed) {
          sessionUseCases.markFirstTimeDone.execute(); // ensure onboarding won't reappear
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Login Failed";
      })
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        const isAuthed = Boolean(action.payload);
        state.status = isAuthed ? "authenticated" : "unauthenticated";
        state.isLoggedIn = isAuthed;
        sessionUseCases.setLoggedIn.execute(isAuthed);
        if (isAuthed) {
          sessionUseCases.markFirstTimeDone.execute(); // prevent repeat onboarding after sign-up
        }
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "SignUp Failed";
      })
      .addCase(forgotThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotThunk.fulfilled, (state, action) => {
        state.status = action.payload ? "authenticated" : "unauthenticated";
      })
      .addCase(forgotThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Email Sent failed";
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = "unauthenticated";
        state.isLoggedIn = false;
        sessionUseCases.setLoggedIn.execute(false);
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "logout failed";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;

export default authReducer;
