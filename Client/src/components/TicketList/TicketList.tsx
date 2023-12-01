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
import { TicketList } from "../../types";
import CheckboxIcon from "../../assets/checkbox.svg";
import CheckboxVariantIcon from "../../assets/checkbox-variant.svg";

interface TicketsProps {
  tickets: TicketList[];
  showCheckbox: boolean;
  handleSum?: () => void | undefined;
  handleDecrement?: () => void | undefined;
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
      {tickets.map((ticket) => (
        <ItemContainer key={ticket.id} $isUsed={ticket.isUsed} role="ingresso">
          <TicketInformationContainer>
            <MovieTitle>{ticket.title}</MovieTitle>
            <MovieSubtitle>{ticket.subtitle}</MovieSubtitle>
          </TicketInformationContainer>
          <TicketInformationContainer>
            <InformationTitle>ID do Pedido</InformationTitle>
            <MovieSubtitle>{ticket.orderId}</MovieSubtitle>
          </TicketInformationContainer>
          <ItemInnerContainer>
            <TicketInformationContainer>
              <InformationTitle>Horário</InformationTitle>
              <MovieSubtitle>
                {dayjs(ticket.eventTime).format("HH:mm A")}
              </MovieSubtitle>
            </TicketInformationContainer>
            <TicketInformationContainer>
              <InformationTitle>Data</InformationTitle>
              <MovieSubtitle>
                {dayjs(ticket.eventDate).format("ddd DD/MM/YYYY")}
              </MovieSubtitle>
            </TicketInformationContainer>
          </ItemInnerContainer>
          <ItemInnerContainer>
            <TicketInformationContainer>
              <InformationTitle>Custo</InformationTitle>
              <MovieSubtitle>{`R$ ${ticket.amountPaid}`}</MovieSubtitle>
            </TicketInformationContainer>
            <TicketInformationContainer>
              <InformationTitle>Assentos</InformationTitle>
              <MovieSubtitle $isUnique={true}>
                {ticket.purcheadSeats.join(", ")}
              </MovieSubtitle>
            </TicketInformationContainer>
          </ItemInnerContainer>
          {showCheckbox && !ticket.isUsed ? (
            <IconContainer
              onClick={() => {
                handleChangeCheckbox(ticket.id);
                if (!isChecked[ticket.id] && handleSum) {
                  handleSum();
                  return;
                }
                handleDecrement && handleDecrement();
              }}
            >
              <img
                src={isChecked[ticket.id] ? CheckboxVariantIcon : CheckboxIcon}
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
