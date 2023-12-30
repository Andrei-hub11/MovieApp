import { navicons } from "../../constants/constants";
import useSidebar from "./useSidebar";

import {
  Aside,
  LogoutContainer,
  LogoutLink,
  ProfileImage,
  ProfileImageContainer,
  SideLInk,
  SideList,
} from "./SidebarStyles";

import Icon from "../Icon/Icon";
import notificationIcon from "../../assets/mingcute_notification-fill.svg";
import ticketsIcon from "../../assets/tabler_book-filled.svg";
import logoutIcon from "../../assets/material-symbols_logout.svg";
import defaultProfilePicture from "../../assets/imagem de perfil default.png";

function Sidebar() {
  const { User, Role, hasNotification, currentPath, handleLogout, redirectTo } =
    useSidebar();

  return (
    <Aside>
      <ProfileImageContainer>
        <ProfileImage
          src={
            User.ProfileImagePath
              ? import.meta.env.VITE_MOVIE_APP_API_URL + User.ProfileImagePath
              : defaultProfilePicture
          }
          alt="imagem de perfil"
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
              $isUnique={
                (hasNotification && link.route === "/ingressos") ||
                (hasNotification && link.route === "/notifications")
              }
              onClick={() => {
                redirectTo(link.route);
              }}
            >
              <Icon
                icon={{
                  src:
                    hasNotification && link.route === "/notifications"
                      ? notificationIcon
                      : hasNotification && link.route === "/ingressos"
                      ? ticketsIcon
                      : link.default,
                  alt: "icone de navegação",
                }}
              />
              {link.name}
            </SideLInk>
          );
        })}
      </SideList>
      <LogoutContainer>
        <LogoutLink onClick={handleLogout}>
          <Icon
            icon={{
              src: logoutIcon,
              alt: "icone de navegação",
            }}
          />
          Sair
        </LogoutLink>
      </LogoutContainer>
    </Aside>
  );
}

export default Sidebar;
