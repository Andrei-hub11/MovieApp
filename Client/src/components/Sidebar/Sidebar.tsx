import { useLocation } from "react-router-dom";

import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

import {
  Aside,
  ProfileImage,
  ProfileImageContainer,
  SideLInk,
  SideList,
} from "./SidebarStyles";

import Anakin from "../../assets/profile-image.jpg";
import Icon from "../Icon/Icon";
import { navicons } from "../../constants/constants";

function Sidebar() {
  const { redirectTo } = useRedirect();
  const location = useLocation();

  const currentPath: string = location.pathname;

  return (
    <Aside>
      <ProfileImageContainer>
        <ProfileImage src={Anakin} />
      </ProfileImageContainer>
      <SideList>
        {navicons.map((link) => (
          <SideLInk
            key={link.route}
            $primary={link.route === currentPath}
            onClick={() => {
              redirectTo(link.route);
            }}
          >
            <Icon
              icon={{
                src: link.default,
                alt: "icone de navegação",
              }}
            />
            {link.name}
          </SideLInk>
        ))}
      </SideList>
    </Aside>
  );
}

export default Sidebar;
