import { useLocation } from "react-router-dom";
import { navicons } from "../../constants/constants";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

import { NavBottom, NavBottomIconContainer, NavIcons } from "./NavbottomStyles";

function Navbottom() {
  const { redirectTo } = useRedirect();
  const location = useLocation();

  const currentPath: string = location.pathname;

  return (
    <NavBottom>
      <NavIcons>
        {navicons.map((icon) => (
          <NavBottomIconContainer
            key={icon.default}
            $isSelected={currentPath == icon.route ? true : false}
            onClick={() => {
              redirectTo(icon.route);
            }}
          >
            <img
              src={currentPath === icon.route ? icon.selected : icon.default}
              loading="lazy"
              alt="icone de navegação"
            />
          </NavBottomIconContainer>
        ))}
      </NavIcons>
    </NavBottom>
  );
}

export default Navbottom;
