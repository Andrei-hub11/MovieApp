import { RouteObject } from "react-router-dom";

import GridContainer from "../../components/Grid/GridContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Main from "../../components/Main/Main";
import Navbottom from "../../components/Nabottom/Navbottom";

import {
  CommonAreas,
  HomeAreas,
  NotificationAreas,
  PaymentAreas,
  ProfileAreas,
  RoomAreas,
} from "../../constants/constants";

import RoomPage from "../../pages/Room/RoomPage";
import Profile from "../../pages/Profile/Profile";
import NotificationPage from "../../pages/Notification/NotificationPage";
import PaymentPage from "../../pages/Payment/PaymentPage";
import TicketsPage from "../../pages/Tickets/TicketsPage";
import UserManager from "../../pages/UserManager/UserManager";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";

//cevitando dependencia circular ao não exportar em constants.tsx
export const routes: RouteObject[] = [
  {
    path: "/home",
    element: (
      <GridContainer gridAreas={HomeAreas}>
        <Sidebar />
        <Navbar
          indicatorProps={{
            sectionName: "",
            src: indicatorIcon,
            alt: "icone da seção de perfil",
          }}
        />
        <Main />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/salas",
    element: (
      <GridContainer gridAreas={RoomAreas}>
        <RoomPage />
      </GridContainer>
    ),
  },
  {
    path: "/notifications",
    element: (
      <GridContainer gridAreas={NotificationAreas}>
        <Sidebar />
        <Navbar
          indicatorProps={{
            sectionName: "Notificações",
            src: indicatorIcon,
            alt: "icone da seção de notificações",
          }}
          isUnique={true}
        />
        <NotificationPage isUnique={true} />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/ingressos",
    element: (
      <GridContainer gridAreas={PaymentAreas}>
        <Sidebar />
        <Navbar
          indicatorProps={{
            sectionName: "Meus ingressos",
            src: indicatorIcon,
            alt: "icone da seção de ingressos",
          }}
          isUnique={true}
        />
        <TicketsPage isUnique={true} />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/controle-de-usuarios",
    element: (
      <GridContainer gridAreas={CommonAreas}>
        <Sidebar />
        <Navbar
          indicatorProps={{
            sectionName: "Controle de usuários",
            src: indicatorIcon,
            alt: "icone da seção controle de usuários",
          }}
          isUnique={true}
        />
        <UserManager isUnique={true} />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/perfil",
    element: (
      <GridContainer gridAreas={ProfileAreas}>
        <Sidebar />
        <Navbar
          indicatorProps={{
            sectionName: "Notificações",
            src: indicatorIcon,
            alt: "icone da seção de perfil",
          }}
          isUnique={true}
        />
        <Profile isUnique={true} />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/pagamento",
    element: (
      <GridContainer gridAreas={PaymentAreas}>
        <Sidebar />
        <Navbar
          indicatorProps={{
            sectionName: "Pagamento",
            src: indicatorIcon,
            alt: "icone da seção de perfil",
          }}
          isUnique={true}
        />
        <PaymentPage />
      </GridContainer>
    ),
  },
];
