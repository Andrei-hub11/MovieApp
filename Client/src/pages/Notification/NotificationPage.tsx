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
import useNotification from "./useNotification";

interface notificationProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}

function NotificationPage({ isUnique }: notificationProps) {
  const { userNotification, notificationNumber } = useNotification();

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
          <Notification
            key={notification}
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0, 1],
              x: [-90, 0],
              transition: { duration: 1, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              x: 200,
              transition: { duration: 1, ease: "easeInOut" },
            }}
          >
            <NotificationText>{notification}</NotificationText>
          </Notification>
        ))}
      </ContainerInner>
    </NotificationContainer>
  );
}

export default NotificationPage;
