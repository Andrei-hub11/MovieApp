import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PurcheadSeats {
  id: string;
  seatNumber: string;
}

interface PurchaseState {
  cartItems: PurcheadSeats[]; // Supondo que os itens do carrinho são representados por IDs
  isProcessing: boolean;
  error: string | null;
}

const initialState: PurchaseState = {
  cartItems: [],
  isProcessing: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<PurcheadSeats>) {
      state.cartItems.push(action.payload);
    },
    startPurchaseProcess(state) {
      state.isProcessing = true;
      state.error = null;
    },
    completePurchase(state) {
      state.isProcessing = false;
      state.cartItems = []; // Limpar o carrinho após a compra ser concluída
    },
    purchaseFailed(state, action: PayloadAction<string>) {
      state.isProcessing = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  startPurchaseProcess,
  completePurchase,
  purchaseFailed,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
