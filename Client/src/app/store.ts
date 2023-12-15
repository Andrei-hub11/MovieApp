import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../utils/account/sliceAccount";
import cinemaReducer from "../utils/cinema/sliceCinema";
import purchaseReducer from "../utils/purchase/purchaseSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    cinema: cinemaReducer,
    purchase: purchaseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
