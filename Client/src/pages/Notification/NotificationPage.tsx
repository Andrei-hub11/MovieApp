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
import manageJWTCookieState from "../../utils/customHook/useJwt/useJwt";
import useSignalRConnection from "../../utils/customHook/useSignalRConnection/useSignalRConnection";
import { useTypedSelector } from "../../app/store";

interface notificationProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}

function NotificationPage({ isUnique }: notificationProps) {
  const { userNotification } = useTypedSelector((state) => state.account);
  const { token } = manageJWTCookieState();

  const { notificationNumber } = useSignalRConnection(token);

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
        {userNotification?.map((notification) => (
          <Notification key={notification}>
            <NotificationText>{notification}</NotificationText>
          </Notification>
        ))}
      </ContainerInner>
    </NotificationContainer>
  );
}

export default NotificationPage;
