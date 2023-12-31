import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat, Room } from "../../types";
import purchaseService from "./purchaseService";

interface PurchaseState {
  cartItems: Seat[] | [];
  currentRoom: Room | "";
  orderId: string;
  isUsedGift: boolean;
  subtotal: number;
  discount: number;
  total: number;
  isProcessing: boolean;
  isPurchaseLoading: boolean;
  isPurchaseSuccess: boolean;
  isPurchaseError: boolean;
  error: string | null;
}

const initialState: PurchaseState = {
  cartItems: [],
  currentRoom: "",
  orderId: "",
  isUsedGift: false,
  subtotal: 0,
  discount: 0,
  total: 0,
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
    setCurrentRoom(state, action: PayloadAction<Room>) {
      state.currentRoom = action.payload;
    },
    setIsUsedGift(state, action: PayloadAction<boolean>) {
      state.isUsedGift = action.payload;

      if (state.isUsedGift) {
        state.total = state.subtotal - state.subtotal;
        state.discount = state.subtotal;
      }
    },
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
      state.isUsedGift = false;
      state.cartItems = [];
      state.orderId = "";
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
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
  setIsUsedGift,
  setCurrentRoom,
  addToCart,
  removeToCart,
  startPurchaseProcess,
  resetPurchase,
  purchaseFailed,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
