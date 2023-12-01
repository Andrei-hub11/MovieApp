import "dayjs/locale/pt-br";

import { Tickets } from "../../constants/constants";
import { IndicatorProps } from "../../types";
import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";

import { TicketsContainer } from "./TicketsPageStyles";

import Indicator from "../../components/SectionIndicator/Indicator";
import TicketPanel from "../../components/TicketList/TicketList";

interface ticketsProps {
  isUnique: boolean;
}

function TicketsPage({ isUnique }: ticketsProps) {
  const indicatorProps: IndicatorProps = {
    sectionName: "Meus ingressos",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  const tickets = {
    Tickets,
  };

  return (
    <TicketsContainer>
      <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      <TicketPanel tickets={tickets.Tickets} showCheckbox={false} />
    </TicketsContainer>
  );
}

export default TicketsPage;
