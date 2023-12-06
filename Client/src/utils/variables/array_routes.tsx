import { RouteObject } from "react-router-dom";

import GridContainer from "../../components/Grid/GridContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Main from "../../pages/Home/Main";
import Navbottom from "../../components/Nabottom/Navbottom";

import {
  CommonAreas,
  HomeAreas,
  NotificationAreas,
  PaymentAreas,
  ProfileAreas,
  RoomAreas,
} from "../../constants/constants";

import Register from "../../pages/Account/Register/Register";
import Login from "../../pages/Account/Login/Login";
import RoomPage from "../../pages/Room/RoomPage";
import Profile from "../../pages/Profile/Profile";
import NotificationPage from "../../pages/Notification/NotificationPage";
import PaymentPage from "../../pages/Payment/PaymentPage";
import TicketsPage from "../../pages/Tickets/TicketsPage";
import UserManager from "../../pages/UserManager/UserManager";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import ProtectedRoute from "../ProtectedRoute";

// evitando dependencia circular ao não exportar em constants.tsx
export const routes: RouteObject[] = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
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
      </ProtectedRoute>
    ),
  },
  {
    path: "/salas",
    element: (
      <ProtectedRoute>
        <GridContainer gridAreas={RoomAreas}>
          <RoomPage />
        </GridContainer>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
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
      </ProtectedRoute>
    ),
  },
  {
    path: "/ingressos",
    element: (
      <ProtectedRoute>
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
      </ProtectedRoute>
    ),
  },
  {
    path: "/controle-de-usuarios",
    element: (
      <ProtectedRoute>
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
      </ProtectedRoute>
    ),
  },
  {
    path: "/perfil",
    element: (
      <ProtectedRoute>
        <GridContainer gridAreas={ProfileAreas}>
          <Sidebar />
          <Navbar
            indicatorProps={{
              sectionName: "Perfil",
              src: indicatorIcon,
              alt: "icone da seção de perfil",
            }}
            isUnique={true}
          />
          <Profile isUnique={true} />
          <Navbottom />
        </GridContainer>
      </ProtectedRoute>
    ),
  },
  {
    path: "/pagamento",
    element: (
      <ProtectedRoute>
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
      </ProtectedRoute>
    ),
  },
];
