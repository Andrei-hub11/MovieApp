import { useState } from "react";

import { IconProps, IndicatorProps, InputsProps } from "../../types";
import { Tickets } from "../../constants/constants";

import {
  ArrowIcon,
  ContainerBtn,
  IconContainer,
  InformationContainer,
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
import Input from "../../components/Input/Input";
import Icon from "../../components/Icon/Icon";

import anakin from "../../assets/profile-image.jpg";
import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import SearchIcon from "../../assets/ic_round-search.svg";
import arrowIcon from "../../assets/solar_arrow-left-linear.svg";

interface userProps {
  isUnique: boolean;
}
function UserManager({ isUnique }: userProps) {
  const [showTickets, setShowTickets] = useState<boolean>(false);
  const [ticketsNumber, setTicketsNumber] = useState<number>(0);

  const indicatorProps: IndicatorProps = {
    sectionName: "Controle de usuários",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  const icon: IconProps = {
    $primary: true,
    src: SearchIcon,
    alt: "search-icon",
    onClick: undefined,
  };

  const inputProps: InputsProps = {
    placeholder: "E-mail do usuário",
    onChange: undefined,
  };

  const handleSumTicketsNumber = () => {
    setTicketsNumber((prevState) => prevState + 1);
  };

  const handleDecrementTicketsNumber = () => {
    setTicketsNumber((prevState) => prevState - 1);
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
        <ArrowIcon
          src={arrowIcon}
          onClick={() => {
            setShowTickets(!showTickets);
          }}
        />
      )}
      {!showTickets ? (
        <NavContainer key={1}>
          <Input input={inputProps}></Input>
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
          <UserBtn $primary>Validar Ingressos</UserBtn>
        </NavContainer>
      )}
      {!showTickets ? (
        <UserContainer>
          <UserInnerContainer>
            <UserImageContainer>
              <UserImage src={anakin} />
            </UserImageContainer>
            <InformationContainer>
              <UserInformation>Anakin Skywalker</UserInformation>
              <UserInformation>anakin.skywalker@jediorder.net</UserInformation>
            </InformationContainer>
          </UserInnerContainer>
          <ContainerBtn>
            <UserBtn
              onClick={() => {
                setShowTickets(!showTickets);
              }}
            >
              Ver Ingressos
            </UserBtn>
          </ContainerBtn>
        </UserContainer>
      ) : (
        <TicketPanel
          tickets={Tickets}
          showCheckbox={true}
          handleSum={handleSumTicketsNumber}
          handleDecrement={handleDecrementTicketsNumber}
        />
      )}
    </UserManagerContainer>
  );
}

export default UserManager;
