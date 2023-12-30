import "dayjs/locale/pt-br";

import { useTypedSelector } from "../../app/store";
import { IndicatorProps } from "../../types";
import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";

import { TicketsContainer } from "./TicketsPageStyles";

import Indicator from "../../components/SectionIndicator/Indicator";
import TicketPanel from "../../components/TicketList/TicketList";
import usePurchaseReset from "../../utils/customHook/usePurchaseReset/usePurchaseReset";

interface ticketsProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}

function TicketsPage({ isUnique }: ticketsProps) {
  const { User } = useTypedSelector((state) => state.account);

  usePurchaseReset();

  const indicatorProps: IndicatorProps = {
    sectionName: "Meus ingressos",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  return (
    <TicketsContainer>
      <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      <TicketPanel tickets={User.Tickets} showCheckbox={false} />
    </TicketsContainer>
  );
}

export default TicketsPage;
