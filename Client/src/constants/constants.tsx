import { IconsList, MovieSlider, TicketList } from "../types";

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
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

export const images = [image1, image2, image3, image4, image5];

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
    altText: "Imagem 1",
    status: "Em cartaz",
    buttonText: "Avatar: O Caminho da Água",
    $primary: true,
  },
  {
    imageSrc: interestelarImage,
    altText: "Imagem 2",
    status: "Em breve",
    buttonText: "Interestelar",
  },
];

const eventTime: Date = new Date();
eventTime.setHours(12, 0, 0, 0);

export const Tickets: TicketList[] = [
  {
    id: "1",
    orderId: "#257481-124",
    title: "Avatar",
    subtitle: "O Caminho da Água",
    eventTime: eventTime,
    eventDate: new Date(2023, 11, 25),
    amountPaid: 60,
    roomNumber: "5",
    purcheadSeats: ["A-1", "A-2", "A-3", "A-4", "A-5", "A-6"],
    isUsed: false,
  },
  {
    id: "2",
    orderId: "#257481-124",
    title: "Avatar",
    subtitle: "O Caminho da Água",
    eventTime: eventTime,
    eventDate: new Date(2023, 11, 25),
    amountPaid: 60,
    roomNumber: "1",
    purcheadSeats: ["A-1", "A-2", "A-3"],
    isUsed: false,
  },
  {
    id: "3",
    orderId: "#257481-124",
    title: "Avatar",
    subtitle: "O Caminho da Água",
    eventTime: eventTime,
    eventDate: new Date(2023, 11, 25),
    amountPaid: 60,
    roomNumber: "2",
    purcheadSeats: ["A-1", "A-2", "A-3"],
    isUsed: false,
  },
  {
    id: "4",
    orderId: "#257481-124",
    title: "Avatar",
    subtitle: "O Caminho da Água",
    eventTime: eventTime,
    eventDate: new Date(2023, 11, 25),
    amountPaid: 60,
    roomNumber: "3",
    purcheadSeats: ["A-1", "A-2", "A-3"],
    isUsed: true,
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
