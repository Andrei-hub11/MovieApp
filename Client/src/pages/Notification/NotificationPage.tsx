import { useState } from "react";
import Indicator from "../../components/SectionIndicator/Indicator";
import {
  ClearBtn,
  ClearBtnContainer,
  ClearBtnInnerContainer,
  ContainerInner,
  Notification,
  NotificationContainer,
  NotificationNumber,
  NotificationText,
} from "./NotificationPageStyles";

import { IndicatorProps } from "../../types";
import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";

interface notificationProps {
  isUnique: boolean;
}

function NotificationPage({ isUnique }: notificationProps) {
  const [notificationNumber, setNotificationNumber] = useState<number>(10);

  const indicatorProps: IndicatorProps = {
    sectionName: "Notificações",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  return (
    <NotificationContainer>
      <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      <ClearBtnContainer>
        <ClearBtnInnerContainer>
          {notificationNumber ? (
            <NotificationNumber>
              {notificationNumber <= 9 ? notificationNumber : `${9}+`}
            </NotificationNumber>
          ) : null}
          <ClearBtn>Limpar Notificações</ClearBtn>
        </ClearBtnInnerContainer>
      </ClearBtnContainer>
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
