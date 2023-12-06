import { IconProps, IndicatorProps } from "../../types";
import {
  BtnContainer,
  CodeContainer,
  ContainerInner,
  Information,
  InnerCodeContainer,
  ProfileBtn,
  ProfileContainer,
  ProfileImage,
  ProfileInformationContainer,
  ProfileText,
} from "./ProfileStyles";

import Indicator from "../../components/SectionIndicator/Indicator";
import Icon from "../../components/Icon/Icon";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import copyIcon from "../../assets/uil_copy.svg";
import anakin from "../../assets/profile-image.jpg";
import editIcon from "../../assets/ic_sharp-edit.svg";
import { MouseEventHandler } from "react";
import { logout } from "../../utils/account/sliceAccount";
import { useAppDispatch } from "../../app/store";

interface profileProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}

function Profile({ isUnique }: profileProps) {
  const dispatch = useAppDispatch();

  const indicatorProps: IndicatorProps = {
    sectionName: "Meu perfil",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  const iconProps: IconProps = {
    src: editIcon,
    alt: "icone de editar",
  };

  const handleCopy = async (copyMe: string) => {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(copyMe);

      /* toast.success("Id copiado com sucesso"); */
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const imageClickHandler: MouseEventHandler<HTMLImageElement> = async (
    event
  ) => {
    await handleCopy(event.currentTarget.id);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ProfileContainer>
      <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      <ProfileInformationContainer>
        <ContainerInner>
          <ProfileImage src={anakin} />
          <Icon icon={iconProps} />
        </ContainerInner>
        <ContainerInner>
          <ProfileText>Nome</ProfileText>
          <ProfileText>Anakin Skywalker</ProfileText>
        </ContainerInner>
        <ContainerInner>
          <ProfileText>E-mail</ProfileText>
          <ProfileText>anakin.skywalker@jediorder.net</ProfileText>
        </ContainerInner>
      </ProfileInformationContainer>
      <BtnContainer>
        <ProfileBtn onClick={handleLogout}>Sair</ProfileBtn>
        <ProfileBtn $primary>Gerar código</ProfileBtn>
      </BtnContainer>
      <CodeContainer>
        <InnerCodeContainer>
          <Information>7d06a2b9-63f7-4c76-a7f9-8c48094f2e81</Information>
          <img
            src={copyIcon}
            alt="ícone de copia"
            id="7d06a2b9-63f7-4c76-a7f9-8c48094f2e81"
            onClick={imageClickHandler}
          />
        </InnerCodeContainer>
      </CodeContainer>
    </ProfileContainer>
  );
}

export default Profile;
