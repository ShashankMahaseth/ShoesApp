import { createAsyncThunk } from "@reduxjs/toolkit";
import { authUseCases } from "../../core/auth/authModule";



const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === "string") {
    return err;
  }
  return "Unknown";
};

export const loginThunk = createAsyncThunk<//typescript generic types

  boolean,//1.Generic=>When the thunk succeeds, it returns a boolean
  { email: string; 
    password: string } //2.Generic=>Argument type=>This defines what parameters the thunk accepts.,
    ,
    /*Meaning when calling thunk:

dispatch(loginThunk({
  email: "test@gmail.com",
  password: "123456"
}))

TypeScript ensures:

✔ email must be string
✔ password must be string*/

  { rejectValue: string }//3.Generic=>Thunk Config=>This defines the type of error message returned when rejected.

  /*Meaning:

rejectWithValue("Invalid password")

Type = string

Without this, TypeScript cannot know error type. */

>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await authUseCases.login.execute(email, password);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const signupThunk = createAsyncThunk<
  boolean,
  { email: string; 
    password: string },
  { rejectValue: string }
>("auth/signup", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await authUseCases.signUp.execute(email, password);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const forgotThunk = createAsyncThunk<
boolean,
{email : string},
{rejectValue:string}
>("auth/forgot", async ({ email }, { rejectWithValue }) => {
  try {
    return await authUseCases.forgot.execute(email);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authUseCases.logout.execute();
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});
