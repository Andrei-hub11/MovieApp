import { useLocation } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { logout } from "../../utils/account/sliceAccount";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

function useSidebar() {
  const { User, Role, hasNotification } = useTypedSelector(
    (state) => state.account
  );

  const dispatch = useAppDispatch();
  const { redirectTo } = useRedirect();
  const location = useLocation();

  const currentPath: string = location.pathname;

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    User,
    Role,
    hasNotification,
    currentPath,
    handleLogout,
    redirectTo,
  };
}

export default useSidebar;
