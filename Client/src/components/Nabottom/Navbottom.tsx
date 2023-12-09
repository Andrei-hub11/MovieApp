import { useLocation } from "react-router-dom";

import { useTypedSelector } from "../../app/store";
import { navicons } from "../../constants/constants";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

import { NavBottom, NavBottomIconContainer, NavIcons } from "./NavbottomStyles";

function Navbottom() {
  const { redirectTo } = useRedirect();
  const account = useTypedSelector((state) => state.account);
  const location = useLocation();

  const currentPath: string = location.pathname;

  return (
    <NavBottom>
      <NavIcons>
        {navicons.map((icon) => {
          if (
            icon.route === "/controle-de-usuarios" &&
            account.Role[0] !== "Admin"
          ) {
            return;
          }

          if (icon.route === "/ingressos" && account.Role[0] === "Admin") {
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
                src={currentPath === icon.route ? icon.selected : icon.default}
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
