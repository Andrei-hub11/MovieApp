import { IconsList, MovieSlider } from "../types";

import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import image9 from "../assets/9.jpg";
import image10 from "../assets/10.jpg";

import HomeIcon from "../assets/mdi_home-outline.svg";
import HomeSelected from "../assets/mdi_home-outline-selected.svg";
import NotificationIcon from "../assets/mingcute_notification-line.svg";
import NotificationSelected from "../assets/mingcute_notification-line-selcted.svg";
import HistoricIcon from "../assets/tabler_book.svg";
import HistoricSelected from "../assets/tabler_book-selected.svg";
import ProfileIcon from "../assets/iconamoon_profile-bold.svg";
import ProfileSelected from "../assets/iconamoon_profile-bold-selected.svg";
import UsersIcon from "../assets/users.svg";
import UsersSelected from "../assets/users-selected.svg";

import interestelarImage from "../assets/interestelar.jpg";
import avatarImage from "../assets/avatar-t.jpg";
import hobbitImage from "../assets/o hobbit, a desolação de smaug.jpg";
import panteraNegra2Image from "../assets/pantera negra 2.jpg";
import dunaImage from "../assets/Duna.jpg";
import madMaxImage from "../assets/mad max, estrada de fúria.jpg";
import johnWickImage from "../assets/johnwick4.jpg";

export const moviesComingSoon = [image6, image7, image8, image9, image10];

export const navicons: IconsList[] = [
  {
    name: "Home",
    route: "/home",
    default: HomeIcon,
    selected: HomeSelected,
  },
  {
    name: "Notificações",
    route: "/notifications",
    default: NotificationIcon,
    selected: NotificationSelected,
  },
  {
    name: "Ingressos",
    route: "/ingressos",
    default: HistoricIcon,
    selected: HistoricSelected,
  },
  {
    name: "Perfil",
    route: "/perfil",
    default: ProfileIcon,
    selected: ProfileSelected,
  },
  {
    name: "Controle de usuarios",
    route: "/controle-de-usuarios",
    default: UsersIcon,
    selected: UsersSelected,
  },
];

export const movies: MovieSlider[] = [
  {
    imageSrc: avatarImage,
    altText: "imagem do filme Avatar",
    status: "Em cartaz",
    buttonText: "Avatar: O Caminho da Água",
    $primary: true,
  },
  {
    imageSrc: johnWickImage,
    altText: "imagem do filme John Wick: Baba Yaga",
    status: "Em cartaz",
    buttonText: "John Wick: Baba Yaga",
  },
  {
    imageSrc: madMaxImage,
    altText: "imagem do filme Mad Max: Estrada de Fúria",
    status: "Em cartaz",
    buttonText: "Mad Max: Estrada de Fúria",
    $primary: true,
  },
  {
    imageSrc: interestelarImage,
    altText: "imagem do filme Interestelar",
    status: "Em breve",
    buttonText: "Interestelar",
  },
  {
    imageSrc: hobbitImage,
    altText: "imagem do filme O Hobbit",
    status: "Em breve",
    buttonText: "O Hobbit: A Desolação de Smaug",
  },
  {
    imageSrc: panteraNegra2Image,
    altText: "imagem do filme Pantera Negra: Wakanda Para Sempre",
    status: "Em breve",
    buttonText: "Pantera Negra: Wakanda Para Sempre",
  },
  {
    imageSrc: dunaImage,
    altText: "imagem do filme Duna",
    status: "Em breve",
    buttonText: "Duna",
  },
];

export const HomeAreas: string = `
"headernav headernav"
"main main"
"navbottom navbottom"
`;

export const CommonAreas: string = `
"main main"
"main main"
"navbottom navbottom"
`;

export const ProfileAreas: string = CommonAreas;

export const RoomAreas: string = CommonAreas;

export const NotificationAreas: string = CommonAreas;

export const PaymentAreas: string = CommonAreas;
