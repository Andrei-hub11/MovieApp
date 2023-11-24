import { RouteObject } from "react-router-dom";
import GridContainer from "../../components/Grid/GridContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Main from "../../components/Main/Main";
import Navbottom from "../../components/Nabottom/Navbottom";
import {
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

//cevitando dependencia circular ao não exportar em constants.tsx
export const routes: RouteObject[] = [
  {
    path: "/home",
    element: (
      <GridContainer gridAreas={HomeAreas}>
        <Sidebar />
        <Navbar />
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
        <NotificationPage />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/perfil",
    element: (
      <GridContainer gridAreas={ProfileAreas}>
        <Profile />
        <Navbottom />
      </GridContainer>
    ),
  },
  {
    path: "/pagamento",
    element: (
      <GridContainer gridAreas={PaymentAreas}>
        <PaymentPage />
      </GridContainer>
    ),
  },
];
