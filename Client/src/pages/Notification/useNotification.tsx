import { useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "../../app/store";
import { resetHasNotification } from "../../utils/account/sliceAccount";
import manageJWTCookieState from "../../utils/customHook/useJwt/useJwt";
import usePurchaseReset from "../../utils/customHook/usePurchaseReset/usePurchaseReset";
import useSignalRConnection from "../../utils/customHook/useSignalRConnection/useSignalRConnection";

const useNotification = () => {
  const { userNotification } = useTypedSelector((state) => state.account);
  const { token } = manageJWTCookieState();

  const dispatch = useAppDispatch();

  usePurchaseReset();

  useEffect(() => {
    dispatch(resetHasNotification());
  }, [dispatch]);

  const { notificationNumber } = useSignalRConnection(token);

  return {
    userNotification,
    notificationNumber,
  };
};

export default useNotification;
