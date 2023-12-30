import { useTypedSelector } from "../../app/store";
import { IconProps, IndicatorProps } from "../../types";

import {
  BtnContainer,
  CodeContainer,
  ContainerInner,
  ControlIconContainer,
  IconImageInput,
  ImageInput,
  Information,
  InnerCodeContainer,
  InputImageContainer,
  ProfileBtn,
  ProfileContainer,
  ProfileImage,
  ProfileInformationContainer,
  ProfileInput,
} from "./ProfileStyles";

import Indicator from "../../components/SectionIndicator/Indicator";
import Icon from "../../components/Icon/Icon";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import copyIcon from "../../assets/uil_copy.svg";
import editIcon from "../../assets/ic_sharp-edit.svg";
import saveIcon from "../../assets/mdi_success-bold.svg";
import closeIcon from "../../assets/ic_outline-close.svg";
import imageInputIcon from "../../assets/mdi_file-image-outline.svg";
import defaultProfilePicture from "../../assets/imagem de perfil default.png";

import useProfile from "./useProfile";

interface profileProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}

function Profile({ isUnique }: profileProps) {
  const {
    handleFileChange,
    handleNameChange,
    handleEmailChange,
    handleCreateGift,
    handleCancelEdit,
    handleSubmit,
    handleEdit,
    handleLogout,
    imageClickHandler,
    previewImage,
    selectedFile,
    isEditable,
    User,
    userData,
    Role,
  } = useProfile();

  const { GiftCards } = useTypedSelector((state) => state.cinema);

  const indicatorProps: IndicatorProps = {
    sectionName: "Meu perfil",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  const editIconProps: IconProps = {
    src: !isEditable ? saveIcon : editIcon,
    alt: !isEditable ? "icone de salvar" : "icone de editar",
    onClick: handleEdit,
  };

  const saveIconProps: IconProps = {
    src: saveIcon,
    alt: "icone de salvar",
    onClick: handleSubmit,
  };

  const closeIconProps: IconProps = {
    src: closeIcon,
    alt: "icone de fechar",
    onClick: handleCancelEdit,
  };

  return (
    <ProfileContainer>
      <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      <ProfileInformationContainer>
        <ContainerInner>
          {User.ProfileImagePath && isEditable ? (
            <ProfileImage
              src={
                User.ProfileImagePath
                  ? import.meta.env.VITE_MOVIE_APP_API_URL +
                    User.ProfileImagePath
                  : defaultProfilePicture
              }
            />
          ) : previewImage ? (
            <ProfileImage src={previewImage as string} $primary />
          ) : (
            <InputImageContainer>
              <ImageInput
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
              <IconImageInput src={imageInputIcon} />
            </InputImageContainer>
          )}
          {!isEditable || selectedFile ? (
            <ControlIconContainer>
              <Icon icon={saveIconProps} />
              <Icon icon={closeIconProps} />
            </ControlIconContainer>
          ) : (
            <Icon icon={editIconProps} />
          )}
        </ContainerInner>
        <ContainerInner>
          <ProfileInput
            role="textbox"
            $isUnique={isEditable}
            disabled={isEditable}
            value={userData.UserName}
            onChange={handleNameChange}
            autoComplete="off"
            aria-autocomplete="none"
            size={userData.UserName.length - 1}
          />
        </ContainerInner>
        <ContainerInner>
          <ProfileInput
            type="text"
            $isUnique={isEditable}
            value={userData.Email}
            disabled={isEditable}
            onChange={handleEmailChange}
            autoComplete="off"
            aria-autocomplete="none"
            size={userData.Email.length - 1}
          />
        </ContainerInner>
      </ProfileInformationContainer>
      <BtnContainer>
        <ProfileBtn onClick={handleLogout}>Sair</ProfileBtn>

        {Role[0] === "Admin" ? (
          <ProfileBtn $primary onClick={handleCreateGift}>
            Gerar código
          </ProfileBtn>
        ) : null}
      </BtnContainer>
      {Role[0] === "Admin" && GiftCards ? (
        <CodeContainer>
          {GiftCards?.map((gift) => (
            <InnerCodeContainer key={gift.Id}>
              <Information>{gift.GiftCodigo}</Information>
              <img
                src={copyIcon}
                alt="ícone de copia"
                id={gift.GiftCodigo}
                onClick={imageClickHandler}
              />
            </InnerCodeContainer>
          ))}
        </CodeContainer>
      ) : null}
    </ProfileContainer>
  );
}

export default Profile;
