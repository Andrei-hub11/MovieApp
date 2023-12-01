import { IconProps, IndicatorProps } from "../../types";
import {
  ContainerInner,
  ProfileContainer,
  ProfileImage,
  ProfileInformationContainer,
  ProfileText,
} from "./ProfileStyles";

import Indicator from "../../components/SectionIndicator/Indicator";
import Icon from "../../components/Icon/Icon";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import anakin from "../../assets/profile-image.jpg";
import editIcon from "../../assets/ic_sharp-edit.svg";

interface profileProps {
  isUnique: boolean;
}

function Profile({ isUnique }: profileProps) {
  const indicatorProps: IndicatorProps = {
    sectionName: "Meu perfil",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  const iconProps: IconProps = {
    src: editIcon,
    alt: "icone de editar",
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
    </ProfileContainer>
  );
}

export default Profile;
