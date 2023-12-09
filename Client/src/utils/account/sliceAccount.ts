import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UpdateImage,
  UpdateUser,
  User,
  UserLogin,
  UserRegister,
} from "../../types";

import accountService from "./accountService";

interface AccountUserState {
  User: User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  Role: [string];
}

const initialState: AccountUserState = {
  User: {
    Id: "",
    UserName: "",
    Email: "",
    ProfileImagePath: "",
    Tickets: [],
  },
  Role: [""],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk(
  "account/login",
  async (user: UserLogin) => {
    try {
      return await accountService.login(user);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const register = createAsyncThunk(
  "account/register",
  async (user: UserRegister, thunkAPI) => {
    try {
      return await accountService.register(user);
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "account/update-user",
  async (userData: UpdateUser) => {
    try {
      return await accountService.updateProfileUser(userData);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "account/upload-image",
  async (imageData: UpdateImage) => {
    try {
      return await accountService.uploadProfileImage(
        imageData.image,
        imageData.Id
      );
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const getMe = createAsyncThunk("account/me", async (token: string) => {
  try {
    return await accountService.getMe(token);
  } catch (error) {
    const message = (error as Error).message;

    throw new Error(message);
  }
});

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
          state.Role = action.payload.Role;
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
          state.Role = action.payload.Role;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(updateProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateProfileUser.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.User = {
            ...state.User,
            UserName: action.payload.User.UserName,
            Email: action.payload.User.Email,
          };
        }
      )
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.User.ProfileImagePath = action.payload.ProfileImage;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
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
        state.Role = [""];
      })
      .addCase(
        getMe.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.User = action.payload.User;
          state.Role = action.payload.Role;
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
        state.Role = [""];
        state.isSuccess = false;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
