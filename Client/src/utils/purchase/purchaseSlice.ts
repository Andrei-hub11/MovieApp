import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat } from "../../types";
import purchaseService from "./purchaseService";

interface PurchaseState {
  cartItems: Seat[] | [];
  subtotal: number;
  total: number;
  orderId: string;
  isProcessing: boolean;
  isPurchaseLoading: boolean;
  isPurchaseSuccess: boolean;
  isPurchaseError: boolean;
  error: string | null;
}

const initialState: PurchaseState = {
  cartItems: [],
  subtotal: 0,
  total: 0,
  orderId: "",
  isPurchaseLoading: false,
  isPurchaseSuccess: false,
  isPurchaseError: false,
  isProcessing: false,
  error: null,
};

export const getOrderId = createAsyncThunk("cinema/get-rooms", async () => {
  try {
    return await purchaseService.getOrderId();
  } catch (error) {
    const message = (error as Error).message;
    throw new Error(message);
  }
});

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Seat>) {
      const { Id } = action.payload;
      const seatExist = state.cartItems.find((seat) => seat.Id === Id);

      if (!seatExist) {
        state.subtotal += action.payload.SeatPrice;
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeToCart(state, action: PayloadAction<{ seatId: string }>) {
      const { seatId } = action.payload;
      const seatExist = state.cartItems.find((seat) => seat.Id === seatId);
      if (seatExist) {
        state.subtotal -= seatExist.SeatPrice;
        state.cartItems = state.cartItems.filter((item) => item.Id !== seatId);
      }

      if (state.cartItems.length === 0) {
        state.orderId = "";
        state.isProcessing = false;
      }
    },

    startPurchaseProcess(state) {
      state.isProcessing = true;
      state.error = null;
    },
    resetPurchase(state) {
      state.isProcessing = false;
      state.cartItems = [];
      state.orderId = "";
    },
    purchaseFailed(state, action: PayloadAction<string>) {
      state.isProcessing = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderId.pending, (state) => {
        state.isPurchaseLoading = true;
      })
      .addCase(getOrderId.fulfilled, (state, action) => {
        state.isPurchaseSuccess = false;
        state.isPurchaseSuccess = true;
        state.orderId = action.payload.OrderId;
      })
      .addCase(getOrderId.rejected, (state) => {
        state.isPurchaseLoading = false;
        state.isPurchaseError = true;
      });
  },
});

export const {
  addToCart,
  removeToCart,

  startPurchaseProcess,
  resetPurchase,
  purchaseFailed,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
