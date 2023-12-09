import {
  MouseEventHandler,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  logout,
  reset,
  updateProfileUser,
  uploadProfileImage,
} from "../../utils/account/sliceAccount";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import {
  IconProps,
  IndicatorProps,
  UpdateImage,
  UpdateUser,
} from "../../types";

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
  ProfileText,
} from "./ProfileStyles";

import Indicator from "../../components/SectionIndicator/Indicator";
import Icon from "../../components/Icon/Icon";

import indicatorIcon from "../../assets/octicon_arrow-right-24.svg";
import copyIcon from "../../assets/uil_copy.svg";
import editIcon from "../../assets/ic_sharp-edit.svg";
import saveIcon from "../../assets/mdi_success-bold.svg";
import closeIcon from "../../assets/ic_outline-close.svg";
import imageInputIcon from "../../assets/mdi_file-image-outline.svg";
import { createGiftCard, getGiftCards } from "../../utils/cinema/sliceCinema";

interface profileProps {
  // para garantir que o indicator não vai ser renderizado desnecessariamente
  isUnique: boolean;
}

function Profile({ isUnique }: profileProps) {
  const { User, isError, isLoading, isSuccess, message, Role } =
    useTypedSelector((state) => state.account);
  const { GiftCards } = useTypedSelector((state) => state.cinema);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const NameRef = useRef<HTMLSpanElement>(null);

  const updateUser: UpdateUser = {
    UserName: User.UserName,
    Email: User.Email,
  };

  const [userData, setUserData] = useState<UpdateUser>(updateUser);

  const indicatorProps: IndicatorProps = {
    sectionName: "Meu perfil",
    src: indicatorIcon,
    alt: "icone da seção de perfil",
  };

  useEffect(() => {
    dispatch(getGiftCards());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("A atualizção foi bem-sucedida! 😉");
      dispatch(reset());
    }
  }, [isError, message, dispatch, isLoading, isSuccess, navigate]);

  const handleSubmit = () => {
    if (!isValidEmail || !isValidName) {
      toast.error("Corrija os campos inválidos");
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
      const updateImage: UpdateImage = {
        Id: User.Id,
        image: formData,
      };
      dispatch(uploadProfileImage(updateImage));
    }

    if (
      userData.UserName !== User.UserName &&
      userData.UserName &&
      isValidName &&
      isValidEmail
    ) {
      dispatch(updateProfileUser(userData));
    }

    setIsEditable(!isEditable);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleCreateGift = () => {
    dispatch(createGiftCard());
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleEdit = () => {
    setIsEditable((prevIsEditable) => {
      const updatedIsEditable = !prevIsEditable;
      if (NameRef.current && updatedIsEditable) {
        setTimeout(() => {
          NameRef.current?.focus();
        }, 0);
      }
      return updatedIsEditable;
    });
  };

  const handleCancelEdit = () => {
    setIsEditable(!isEditable);
    setUserData({
      ...userData,
      UserName: User.UserName,
      Email: User.Email,
    });
    setPreviewImage(null);
    setSelectedFile(null);
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

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value || "";
    if (newText.trim()?.length === 0) {
      setIsValidName(isValidName);
      toast.error("O nome não pode estar vazio");
    }
    setIsValidName(true);
    setUserData({
      ...userData,
      UserName: event.currentTarget.value || "",
    });
  };

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newEmail = event.currentTarget.value || "";

    if (newEmail.trim()?.length === 0) {
      toast.error("O email não pode estar vazio");
    }

    if (!regex.test(newEmail)) {
      setIsValidEmail(false);
      toast.error("O email usado não é válido");
    }
    setIsValidEmail(true);
    setUserData({
      ...userData,
      Email: event.currentTarget.value || "",
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ProfileContainer>
      <Indicator indicator={indicatorProps} $isUnique={isUnique} />
      <ProfileInformationContainer>
        <ContainerInner>
          {User.ProfileImagePath && isEditable ? (
            <ProfileImage
              src={
                import.meta.env.VITE_MOVIE_APP_API_URL + User.ProfileImagePath
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
          <ProfileText>Nome</ProfileText>

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
          <ProfileText>E-mail</ProfileText>
          <ProfileInput
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
                id="7d06a2b9-63f7-4c76-a7f9-8c48094f2e81"
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
