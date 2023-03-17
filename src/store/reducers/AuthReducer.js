import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, axiosInstance } from "../../api/api";

export const Login = createAsyncThunk("auth/Login", async (values) => {
  try {
    const response = await axiosInstance.post("user/login", values);

    return response.data;
  } catch (err) {
    throw err.response?.data?.code;
  }
});

export const Registration = createAsyncThunk(
  "auth/Registration",
  async (values) => {
    try {
      const response = await axiosInstance.post("/api/user/signup", values);

      return response.data;
    } catch (err) {
      throw new Error(err.response?.data);
    }
  }
);

const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem(ACCESS_TOKEN) ? true : false,
    message: "",
    errorLogin: false,
    loginSuccess: false,
    type: "info",
    errorStatus: -1,
  },

  reducers: {
    resetNotificationConfig: (state) => {
      state.message = "";
      state.type = "info";
    },
    resetErrors: (state) => {
      state.errorLogin = false;
      state.errorStatus = 0;
      state.loginSuccess = false;
    },
    logOut: (state) => {
      state.isAuth = false;
      localStorage.removeItem(ACCESS_TOKEN);
      state.message = "";
      state.type = "info";
      state.errorLogin = false;
      state.errorStatus = 0;
      state.loginSuccess = false;
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, { payload }) => {
      state.isAuth = true;
      state.type = "success";
      state.errorLogin = false;
      state.loginSuccess = true;
      state.message = "Успешный вход!";
      localStorage.setItem(ACCESS_TOKEN, payload.token);
    },
    [Login.pending]: (state) => {
      state.isAuth = false;
      state.errorLogin = false;
      state.errorStatus = 0;
      state.loginSuccess = false;
    },
    [Login.rejected]: (state, error) => {
      state.isAuth = false;
      state.errorLogin = true;
      state.loginSuccess = false;
      state.errorStatus = Number(error.error.message);
    },
    [Registration.fulfilled]: (state) => {
      state.message = "Регистрация прошла успешно";
      state.type = "success";
    },
    [Registration.rejected]: (state) => {
      state.message = "Произошла ошибка";
      state.type = "error";
    },
  },
});

export const { resetNotificationConfig, resetErrors, logOut } =
  AuthReducer.actions;

export default AuthReducer.reducer;
