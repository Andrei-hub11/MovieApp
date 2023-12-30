import { useState, useEffect, ChangeEvent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UpdateImage } from "../../types";

import {
  logout,
  reset,
  updateProfileUser,
  uploadProfileImage,
} from "../../utils/account/sliceAccount";
import {
  ManagerReset,
  createGiftCard,
  getGiftCards,
} from "../../utils/cinema/sliceCinema";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import usePurchaseReset from "../../utils/customHook/usePurchaseReset/usePurchaseReset";

const useProfile = () => {
  const { User, isError, isLoading, isSuccess, message, Role } =
    useTypedSelector((state) => state.account);
  const { GiftCards, isManagerSuccess } = useTypedSelector(
    (state) => state.cinema
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  usePurchaseReset();

  const [isEditable, setIsEditable] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [userData, setUserData] = useState({
    UserName: User.UserName,
    Email: User.Email,
  });

  const handleEdit = () => {
    setIsEditable((prevIsEditable) => {
      const updatedIsEditable = !prevIsEditable;
      return updatedIsEditable;
    });
  };

  const handleCancelEdit = () => {
    setIsEditable(!isEditable);
    setUserData({ UserName: User.UserName, Email: User.Email });
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value || "";
    if (newText.trim()?.length === 0) {
      setIsValidName(isValidName);
      toast.error("O nome não pode estar vazio");
    }
    setIsValidName(true);
    setUserData({ ...userData, UserName: event.currentTarget.value || "" });
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
    setUserData({ ...userData, Email: event.currentTarget.value || "" });
  };

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
      userData.Email !== User.Email &&
      isValidName &&
      isValidEmail
    ) {
      dispatch(updateProfileUser(userData));
    }

    setIsEditable(!isEditable);
    setSelectedFile(null);
    setPreviewImage(null);
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

  const handleCopy = async (copyMe: string) => {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(copyMe);

      toast.success("Código copiado com sucesso");
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

  const handleCreateGift = () => {
    dispatch(createGiftCard());
  };

  useEffect(() => {
    if (Role[0] === "Admin") {
      dispatch(getGiftCards());
    }
  }, [Role, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("A atualizção foi bem-sucedida! 😉");
      dispatch(reset());
    }

    if (isManagerSuccess) {
      dispatch(ManagerReset());
    }
  }, [
    isError,
    message,
    dispatch,
    isLoading,
    isSuccess,
    isManagerSuccess,
    navigate,
  ]);

  return {
    isEditable,
    selectedFile,
    previewImage,
    isValidName,
    isValidEmail,
    userData,
    handleEdit,
    handleCancelEdit,
    handleNameChange,
    handleEmailChange,
    handleSubmit,
    handleFileChange,
    handleCreateGift,
    handleLogout,
    imageClickHandler,
    GiftCards,
    Role,
    User,
  };
};

export default useProfile;
