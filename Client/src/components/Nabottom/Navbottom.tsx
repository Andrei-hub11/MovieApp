import { useLocation } from "react-router-dom";

import { useTypedSelector } from "../../app/store";
import { navicons } from "../../constants/constants";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

import { NavBottom, NavBottomIconContainer, NavIcons } from "./NavbottomStyles";

import notificationIcon from "../../assets/mingcute_notification-fill.svg";
import ticketsIcon from "../../assets/tabler_book-filled.svg";

function Navbottom() {
  const { redirectTo } = useRedirect();
  const { Role, hasNotification } = useTypedSelector((state) => state.account);
  const location = useLocation();

  const currentPath: string = location.pathname;

  return (
    <NavBottom>
      <NavIcons>
        {navicons.map((icon) => {
          if (icon.route === "/controle-de-usuarios" && Role[0] !== "Admin") {
            return;
          }

          if (icon.route === "/ingressos" && Role[0] === "Admin") {
            return;
          }

          return (
            <NavBottomIconContainer
              key={icon.default}
              $isSelected={currentPath == icon.route ? true : false}
              onClick={() => {
                redirectTo(icon.route);
              }}
            >
              <img
                src={
                  currentPath === icon.route
                    ? icon.selected
                    : hasNotification && icon.route === "/notifications"
                    ? notificationIcon
                    : hasNotification && icon.route === "/ingressos"
                    ? ticketsIcon
                    : icon.default
                }
                loading="eager"
                alt="icone de navegação"
              />
            </NavBottomIconContainer>
          );
        })}
      </NavIcons>
    </NavBottom>
  );
}

export default Navbottom;
