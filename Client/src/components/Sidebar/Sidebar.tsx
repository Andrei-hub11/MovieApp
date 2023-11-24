import {
  Aside,
  ProfileImage,
  ProfileImageContainer,
  SideLInk,
  SideList,
} from "./SidebarStyles";
import Anakin from "../../assets/profile-image.jpg";
import { LinkList } from "../../types";
import Icon from "../Icon/Icon";
import HomeIcon from "../../assets/mdi_home-outline.svg";
import NotificationIcon from "../../assets/mingcute_notification-line.svg";
import HistoricIcon from "../../assets/tabler_book.svg";
import ProfileIcon from "../../assets/iconamoon_profile-bold.svg";

const linkList: LinkList[] = [
  {
    icon: {
      $primary: true,
      src: HomeIcon,
      alt: "home-icon",
      onClick: undefined,
    },
    name: "Home",
    $primary: true,
  },
  {
    icon: {
      $primary: true,
      src: NotificationIcon,
      alt: "notification-icon",
      onClick: undefined,
    },
    name: "Notificações",
    $primary: false,
  },
  {
    icon: {
      $primary: true,
      src: HistoricIcon,
      alt: "historic-icon",
      onClick: undefined,
    },
    name: "Ingressos",
    $primary: false,
  },
  {
    icon: {
      $primary: true,
      src: ProfileIcon,
      alt: "profile-icon",
      onClick: undefined,
    },
    name: "Perfil",
    $primary: false,
  },
];

function Sidebar() {
  return (
    <Aside>
      <ProfileImageContainer>
        <ProfileImage src={Anakin} />
      </ProfileImageContainer>
      <SideList>
        {linkList.map((link) => (
          <SideLInk key={link.name} $primary={link.$primary}>
            <Icon icon={link.icon} />
            {link.name}
          </SideLInk>
        ))}
      </SideList>
    </Aside>
  );
}

export default Sidebar;
