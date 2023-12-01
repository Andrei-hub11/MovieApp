import { DateList, IconsList, Movie, TicketList } from "../types";

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
import NotificationIcon from "../assets/mingcute_notification-line.svg";
import HistoricIcon from "../assets/tabler_book.svg";
import HistoricSelected from "../assets/tabler_book-selected.svg";
import ProfileIcon from "../assets/iconamoon_profile-bold.svg";
import HomeSelected from "../assets/mdi_home-outline-selected.svg";
import NotificationSelected from "../assets/mingcute_notification-line-selcted.svg";
import ProfileSelected from "../assets/iconamoon_profile-bold-selected.svg";

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
];

export const movies: Movie[] = [
  {
    imageSrc: avatarImage,
    altText: "Imagem 1",
    status: "Em cartaz",
    buttonText: "Avatar: O Caminho da Água",
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
    purcheadSeats: ["A-1", "A-2", "A-3", "A-5", "A-6"],
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
    purcheadSeats: ["A-1", "A-2", "A-3"],
    isUsed: true,
  },
];

export const HomeAreas: string = `
"headernav headernav"
"main main"
"navbottom navbottom"
`;

export const RoomAreas: string = `
"main main"
"main main"
"main main"
`;

export const CommonAreas: string = `
"main main"
"main main"
"navbottom navbottom"
`;

export const ProfileAreas: string = CommonAreas;

export const NotificationAreas: string = CommonAreas;

export const PaymentAreas: string = CommonAreas;

export const data = [
  {
    group: 1,
    items: [
      { id: 1, name: "Item", seat: "a-1" },
      { id: 2, name: "Item", gap: "1.6rem" },
      { id: 3, name: "Item", seat: "a-3" },
      { id: 4, name: "Item", seat: "a-4" },
      { id: 5, name: "Item", seat: "a-5" },
      { id: 6, name: "Item", gap: "1.6rem" },
      { id: 7, name: "Item", seat: "a-7" },
      { id: 8, name: "Item", seat: "a-8" },
      { id: 9, name: "Item", seat: "a-9" },
      { id: 10, name: "Item", gap: "1.6rem" },
      { id: 11, name: "Item", seat: "a-11" },
      { id: 12, name: "Item", seat: "a-12" },
    ],
  },
  {
    group: 2,
    items: [
      { id: 13, name: "Item", seat: "b-1" },
      { id: 14, name: "Item", seat: "b-2" },
      { id: 15, name: "Item", seat: "b-3" },
      { id: 16, name: "Item", seat: "b-4" },
      { id: 17, name: "Item", seat: "b-5" },
      { id: 18, name: "Item", seat: "b-6" },
      { id: 19, name: "Item", seat: "b-7" },
      { id: 20, name: "Item", seat: "b-8" },
      { id: 21, name: "Item", seat: "b-9" },
      { id: 22, name: "Item", seat: "b-10" },
      { id: 23, name: "Item", seat: "b-11" },
      { id: 24, name: "Item", seat: "b-12" },
      { id: 25, name: "Item", seat: "b-13" },
      { id: 26, name: "Item", seat: "b-14" },
    ],
  },
  {
    group: 3,
    items: [
      { id: 27, name: "Item" },
      { id: 28, name: "Item" },
      { id: 29, name: "Item" },
      { id: 30, name: "Item" },
      { id: 31, name: "Item" },
      { id: 32, name: "Item" },
      { id: 33, name: "Item" },
      { id: 34, name: "Item" },
      { id: 35, name: "Item" },
      { id: 36, name: "Item" },
      { id: 37, name: "Item" },
      { id: 38, name: "Item" },
      { id: 39, name: "Item" },
      { id: 40, name: "Item" },
    ],
  },
  {
    group: 4,
    items: [
      { id: 41, name: "Item" },
      { id: 42, name: "Item" },
      { id: 43, name: "Item" },
      { id: 44, name: "Item" },
      { id: 45, name: "Item" },
      { id: 46, name: "Item", gap: "4.8rem" },
      { id: 47, name: "Item" },
      { id: 48, name: "Item" },
      { id: 49, name: "Item" },
      { id: 50, name: "Item" },
      { id: 51, name: "Item" },
      { id: 52, name: "Item" },
    ],
  },
  {
    group: 5,
    items: [
      { id: 53, name: "Item" },
      { id: 54, name: "Item" },
      { id: 55, name: "Item" },
      { id: 56, name: "Item" },
      { id: 57, name: "Item" },
      { id: 58, name: "Item", gap: "4.8rem" },
      { id: 59, name: "Item" },
      { id: 60, name: "Item" },
      { id: 61, name: "Item" },
      { id: 62, name: "Item" },
      { id: 63, name: "Item" },
      { id: 64, name: "Item" },
    ],
  },
  {
    group: 6,
    items: [
      { id: 65, name: "Item" },
      { id: 66, name: "Item" },
      { id: 67, name: "Item" },
      { id: 68, name: "Item" },
      { id: 69, name: "Item" },
      { id: 70, name: "Item", gap: "4.8rem" },
      { id: 71, name: "Item" },
      { id: 72, name: "Item" },
      { id: 73, name: "Item" },
      { id: 74, name: "Item" },
      { id: 75, name: "Item" },
      { id: 76, name: "Item" },
    ],
  },
];

export const dateList: DateList[] = [
  {
    id: "1",
    day: "Dom",
    date: "11",
  },
  {
    id: "2",
    day: "Seg",
    date: "12",
  },
  {
    id: "3",
    day: "Ter",
    date: "13",
  },
  {
    id: "4",
    day: "Qua",
    date: "14",
  },
  {
    id: "5",
    day: "Qui",
    date: "15",
  },
  {
    id: "6",
    day: "Sex",
    date: "16",
  },
  {
    id: "7",
    day: "Sáb",
    date: "17",
  },
  {
    id: "8",
    day: "Dom",
    date: "18",
  },
];

export const hoursList: string[] = ["13:00", "14:00", "17:00", "20:00"];
