import Indicator from "../../components/SectionIndicator/Indicator";
import {
  ContainerInner,
  Notification,
  NotificationContainer,
  NotificationText,
} from "./NotificationPageStyles";

import { IndicatorProps } from "../../types";
import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";

function NotificationPage() {
  const indicatorProps: IndicatorProps = {
    sectionName: "Notificações",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  return (
    <NotificationContainer>
      <Indicator indicator={indicatorProps} />
      <ContainerInner>
        <Notification>
          <NotificationText>
            Olá, Anakin. Seu pedido #9483232 foi confirmado.
          </NotificationText>
        </Notification>
      </ContainerInner>
    </NotificationContainer>
  );
}

export default NotificationPage;
