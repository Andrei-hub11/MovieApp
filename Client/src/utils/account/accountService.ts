import axios, { AxiosError } from "axios";
import Cookies from "cookies-js";

import {
  ErrorResponse,
  TicketData,
  UpdateUser,
  UserLogin,
  UserRegister,
} from "../../types";
import manageJWTCookieState from "../customHook/useJwt/useJwt";

//definindo endpoint
const API_URL = import.meta.env.VITE_MOVIE_APP_API_URL + "/api/v1/";

const login = async (userData: UserLogin) => {
  try {
    const { data } = await axios.post(API_URL + "login", userData);
    const { Token } = data;

    const { saveToken } = manageJWTCookieState();
    saveToken(Token);

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;

      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const register = async (userData: UserRegister) => {
  const { data } = await axios.post(API_URL + "register", userData);

  const { Token } = data;

  const { saveToken } = manageJWTCookieState();
  saveToken(Token);

  return data;
};

const updateProfileUser = async (userData: UpdateUser) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.put(
      API_URL + `update-user`,
      { UserName: userData.UserName, Email: userData.Email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const uploadProfileImage = async (image: FormData, userId: string) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.post(
      API_URL + `upload-image/${userId}`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const createTicket = async (
  roomId: string,
  ticket: TicketData,
  giftCode: string
) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.post(
      API_URL + `create-ticket/${roomId}`,
      ticket,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // confirmando o uso do gift no pagamento
    await axios.put(API_URL + `update-gift/${giftCode}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const getMe = async (accessToken: string) => {
  try {
    const { data } = await axios.get(API_URL + "get-me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const logout = () => {
  Cookies.expire("accessToken");

  return null;
};

const accountService = {
  register,
  login,
  updateProfileUser,
  uploadProfileImage,
  createTicket,
  getMe,
  logout,
};

export default accountService;
