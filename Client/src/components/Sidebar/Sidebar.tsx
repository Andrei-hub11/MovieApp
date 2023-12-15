import { useLocation } from "react-router-dom";

import useRedirect from "../../utils/customHook/useRedirect/useRedirect";
import { useTypedSelector } from "../../app/store";

import {
  Aside,
  ProfileImage,
  ProfileImageContainer,
  SideLInk,
  SideList,
} from "./SidebarStyles";

import Icon from "../Icon/Icon";
import { navicons } from "../../constants/constants";

function Sidebar() {
  const { User, Role } = useTypedSelector((state) => state.account);
  const { redirectTo } = useRedirect();
  const location = useLocation();

  const currentPath: string = location.pathname;

  return (
    <Aside>
      <ProfileImageContainer>
        <ProfileImage
          src={import.meta.env.VITE_MOVIE_APP_API_URL + User.ProfileImagePath}
        />
      </ProfileImageContainer>
      <SideList>
        {navicons.map((link) => {
          if (link.route === "/controle-de-usuarios" && Role[0] !== "Admin") {
            return;
          }

          if (link.route === "/ingressos" && Role[0] === "Admin") {
            return;
          }

          return (
            <SideLInk
              key={link.route}
              $primary={
                link.route === currentPath ||
                (link.route === "/home" && currentPath === "/salas")
              }
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
          );
        })}
      </SideList>
    </Aside>
  );
}

export default Sidebar;
