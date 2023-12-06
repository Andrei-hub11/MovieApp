import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserLogin, UserRegister } from "../../types";

import accountService from "./serviceAccount";

interface AccountUserState {
  User: User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  Roles: [string];
}

const initialState: AccountUserState = {
  User: {
    Id: "",
    UserName: "",
    Email: "",
    ProfileImagePath: "",
    Tickets: [],
  },
  Roles: [""],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    try {
      return await accountService.login(user);
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserRegister, thunkAPI) => {
    try {
      return await accountService.register(user);
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/me",
  async (token: string, thunkAPI) => {
    try {
      return await accountService.getMe(token);
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return accountService.logout();
});

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.User = action.payload.User;
          state.Roles = action.payload.Roles;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.User = action.payload.User;
          state.Roles = action.payload.Roles;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Erro desconhecido";
        state.User = {
          Id: "",
          UserName: "",
          Email: "",
          ProfileImagePath: "",
          Tickets: [],
        };
        state.Roles = [""];
      })
      .addCase(
        getMe.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.User = action.payload.User;

          state.Roles = action.payload.Roles;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.User = {
          Id: "",
          UserName: "",
          Email: "",
          ProfileImagePath: "",
          Tickets: [],
        };
        state.Roles = [""];
        state.isSuccess = false;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
