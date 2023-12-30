import { useState } from "react";
import dayjs from "dayjs";

import {
  IconContainer,
  InformationTitle,
  InnerContainerTickets,
  ItemContainer,
  ItemInnerContainer,
  MovieSubtitle,
  MovieTitle,
  TicketInformationContainer,
} from "./TicketListStyle";
import { UserTickets } from "../../types";
import CheckboxIcon from "../../assets/checkbox.svg";
import CheckboxVariantIcon from "../../assets/checkbox-variant.svg";

interface TicketsProps {
  tickets: UserTickets[];
  showCheckbox: boolean;
  handleSum?: (ticket: UserTickets) => void | undefined;
  handleDecrement?: (ticket: UserTickets) => void | undefined;
}

interface CheckboxState {
  [key: string]: boolean;
}

function TicketPanel({
  tickets,
  showCheckbox,
  handleSum,
  handleDecrement,
}: TicketsProps) {
  const [isChecked, setIsChecked] = useState<CheckboxState>({});
  dayjs.locale("pt-br");

  const handleChangeCheckbox = (id: string) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [id]: prevState[id] ? false : true,
    }));
  };

  return (
    <InnerContainerTickets
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 0.5, 0.7, 1],
        transition: { duration: 2 },
      }}
    >
      {tickets?.map((ticket) => (
        <ItemContainer
          key={ticket.Id}
          id={ticket.Id}
          $isUsed={ticket.IsUsed}
          $isUnique={ticket.PurchasedSeats.length >= 4}
          role="ingresso"
        >
          <TicketInformationContainer>
            <MovieTitle>{ticket.MovieTitle}</MovieTitle>
            <MovieSubtitle>{ticket.MovieSubtitle}</MovieSubtitle>
          </TicketInformationContainer>
          <TicketInformationContainer>
            <InformationTitle>ID do Pedido</InformationTitle>
            <MovieSubtitle>{ticket.OrderId}</MovieSubtitle>
          </TicketInformationContainer>
          <ItemInnerContainer>
            <TicketInformationContainer>
              <InformationTitle>Horário</InformationTitle>
              <MovieSubtitle>
                {dayjs(ticket.EventDateTime.Date).format("HH:mm A")}
              </MovieSubtitle>
            </TicketInformationContainer>
            <TicketInformationContainer>
              <InformationTitle>Data</InformationTitle>
              <MovieSubtitle>
                {dayjs(ticket.EventDateTime.Date).format("ddd DD/MM/YYYY")}
              </MovieSubtitle>
            </TicketInformationContainer>
          </ItemInnerContainer>
          <ItemInnerContainer>
            <TicketInformationContainer>
              <InformationTitle>Custo</InformationTitle>
              <MovieSubtitle>{`R$ ${ticket.AmountPaid}`}</MovieSubtitle>
            </TicketInformationContainer>
            <TicketInformationContainer>
              <InformationTitle>Assentos</InformationTitle>
              <MovieSubtitle $isUnique={true}>
                {ticket.PurchasedSeats.join(", ")}
              </MovieSubtitle>
            </TicketInformationContainer>
          </ItemInnerContainer>
          <ItemInnerContainer>
            <TicketInformationContainer>
              <InformationTitle>Sala</InformationTitle>
              <MovieSubtitle $isUnique={true}>
                {ticket.RoomNumber}
              </MovieSubtitle>
            </TicketInformationContainer>
          </ItemInnerContainer>
          {showCheckbox && !ticket.IsUsed ? (
            <IconContainer
              onClick={() => {
                handleChangeCheckbox(ticket.Id);
                if (!isChecked[ticket.Id] && handleSum) {
                  handleSum(ticket);
                  return;
                }
                handleDecrement && handleDecrement(ticket);
              }}
            >
              <img
                src={isChecked[ticket.Id] ? CheckboxVariantIcon : CheckboxIcon}
                alt="icone de checkbox"
              />
            </IconContainer>
          ) : null}
        </ItemContainer>
      ))}
    </InnerContainerTickets>
  );
}

export default TicketPanel;
