import { IconProps, IndicatorProps, UserTickets } from "../../types";
import useUserManagement from "./useUserManager";

import {
  ArrowIcon,
  ContainerBtn,
  IconContainer,
  InformationContainer,
  Input,
  NavContainer,
  SelectedTickets,
  UserBtn,
  UserContainer,
  UserImage,
  UserImageContainer,
  UserInformation,
  UserInnerContainer,
  UserManagerContainer,
} from "./UserManagerStyles";

import TicketPanel from "../../components/TicketList/TicketList";
import Indicator from "../../components/SectionIndicator/Indicator";
import Icon from "../../components/Icon/Icon";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import SearchIcon from "../../assets/ic_round-search.svg";
import arrowIcon from "../../assets/solar_arrow-left-linear.svg";
import defaultProfilePicture from "../../assets/imagem de perfil default.png";

interface userProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}
function UserManager({ isUnique }: userProps) {
  const {
    UserFound,
    showUser,
    isValidEmail,
    showTickets,
    ticketsNumber,
    handleCloseTickets,
    handlShowTickets,
    handleSumTicketsNumber,
    handleMarkTicketUsed,
    handleDecrementTicketsNumber,
    handleOnChangeSearch,
    handleGetUserByEmail,
  } = useUserManagement();

  const indicatorProps: IndicatorProps = {
    sectionName: "Controle de usuários",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  const icon: IconProps = {
    $primary: true,
    src: SearchIcon,
    alt: "search-icon",
    onClick: handleGetUserByEmail,
  };

  return (
    <UserManagerContainer
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 0.5, 0.7, 1],
        transition: { duration: 2 },
      }}
    >
      {!showTickets ? (
        <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      ) : (
        <ArrowIcon src={arrowIcon} onClick={handlShowTickets} />
      )}
      {!showTickets ? (
        <NavContainer key={1}>
          <Input
            placeholder="E-mail do usuário"
            onChange={handleOnChangeSearch}
            $primary={isValidEmail ? true : false}
          />
          <IconContainer $primary>
            <Icon icon={icon} />
          </IconContainer>
        </NavContainer>
      ) : (
        <NavContainer
          $primary
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0.5, 0.7, 1],
            transition: { duration: 2 },
          }}
        >
          {ticketsNumber ? (
            <SelectedTickets>
              {ticketsNumber <= 9 ? ticketsNumber : `${9}+`}
            </SelectedTickets>
          ) : null}
          {ticketsNumber ? (
            <UserBtn $primary onClick={handleMarkTicketUsed}>
              Validar Ingressos
            </UserBtn>
          ) : (
            <UserBtn $primary onClick={handleCloseTickets}>
              Voltar
            </UserBtn>
          )}
        </NavContainer>
      )}
      {!showTickets && showUser ? (
        <UserContainer>
          <UserInnerContainer>
            <UserImageContainer>
              <UserImage
                src={
                  UserFound.ProfileImagePath
                    ? import.meta.env.VITE_MOVIE_APP_API_URL +
                      UserFound.ProfileImagePath
                    : defaultProfilePicture
                }
                alt="imagem de perfil do usuário"
              />
            </UserImageContainer>
            <InformationContainer>
              <UserInformation>{UserFound.UserName}</UserInformation>
              <UserInformation>{UserFound.Email}</UserInformation>
            </InformationContainer>
          </UserInnerContainer>
          <ContainerBtn>
            <UserBtn onClick={handlShowTickets}>Ver Ingressos</UserBtn>
          </ContainerBtn>
        </UserContainer>
      ) : (
        <TicketPanel
          tickets={UserFound.Tickets.filter((ticket) => ticket.IsUsed !== true)}
          showCheckbox={true}
          handleSum={(ticket: UserTickets) => handleSumTicketsNumber(ticket)}
          handleDecrement={(ticket: UserTickets) =>
            handleDecrementTicketsNumber(ticket)
          }
        />
      )}
    </UserManagerContainer>
  );
}

export default UserManager;
