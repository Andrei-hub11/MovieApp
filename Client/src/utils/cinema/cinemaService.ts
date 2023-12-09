import axios, { AxiosError } from "axios";
import manageJWTCookieState from "../customHook/useJwt/useJwt";
import { ErrorResponse } from "../../types";

const API_URL = import.meta.env.VITE_MOVIE_APP_API_URL + "/api/v1/";

const getGiftCards = async () => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + `giftcards`, {
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

const createGiftCard = async () => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.post(API_URL + `create-giftcard`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

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

const cinemaService = {
  createGiftCard,
  getGiftCards,
};

export default cinemaService;
