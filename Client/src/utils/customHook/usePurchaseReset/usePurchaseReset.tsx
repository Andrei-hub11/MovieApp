import { useEffect } from "react";
import { useAppDispatch } from "../../../app/store";
import { resetPurchase } from "../../purchase/purchaseSlice";
import { resetGiftValidState } from "../../cinema/sliceCinema";

const usePurchaseReset = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPurchase());
    dispatch(resetGiftValidState());
  }, [dispatch]);
};

export default usePurchaseReset;
