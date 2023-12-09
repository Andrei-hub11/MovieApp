import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GiftCard, User } from "../../types";
import cinemaService from "./cinemaService";

interface CinemaState {
  Users: User[];
  Tickets: [];
  GiftCards: GiftCard[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: CinemaState = {
  Users: [
    {
      Id: "",
      UserName: "",
      Email: "",
      ProfileImagePath: "",
      Tickets: [],
    },
  ],
  Tickets: [],
  GiftCards: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getGiftCards = createAsyncThunk("cinema/get-gift", async () => {
  try {
    return await cinemaService.getGiftCards();
  } catch (error) {
    const message = (error as Error).message;
    throw new Error(message);
  }
});

export const createGiftCard = createAsyncThunk(
  "cinema/create-gift",
  async () => {
    try {
      return await cinemaService.createGiftCard();
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinema",
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
      .addCase(getGiftCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getGiftCards.fulfilled,
        (state, action: PayloadAction<CinemaState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.GiftCards =
            action.payload.GiftCards?.filter((gift) => gift.IsUsed !== true) ??
            action.payload.GiftCards;
        }
      )
      .addCase(getGiftCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(createGiftCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGiftCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.Message || "Unknown error";
        state.GiftCards = Array.isArray(state?.GiftCards)
          ? [...state.GiftCards, action.payload.GiftCard]
          : [action.payload.GiftCard];
      })
      .addCase(createGiftCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      });
  },
});

export const { reset } = cinemaSlice.actions;
export default cinemaSlice.reducer;
