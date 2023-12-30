import axios, { AxiosError } from "axios";
import manageJWTCookieState from "../customHook/useJwt/useJwt";
import { ErrorResponse, UserTickets } from "../../types";
import ToastService from "../variables/toastService";

const API_URL = import.meta.env.VITE_MOVIE_APP_API_URL + "/api/v1/";

const getUserByEmail = async (userEmail: string) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + `user-by-email/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 400) {
        ToastService.showError(axiosError.response?.data.Errors);
      }
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const getRooms = async () => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + "rooms-events-coming", {
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

const getRoomsByMovieTitle = async (movieTitle: string) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + `rooms-by-title`, {
      params: {
        movieTitle: movieTitle,
      },
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

const getCheckGiftCard = async (giftCode: string) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + `check-giftcard/${giftCode}`, {
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

const markTicketUsed = async (tickets: UserTickets[]) => {
  const { token } = manageJWTCookieState();

  for (const ticket of tickets) {
    try {
      const { data } = await axios.put(
        API_URL + `update-ticket/${ticket.Id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      ToastService.showSuccess("Ingresso validado");
      return data;
    } catch (error) {
      if ((error as AxiosError<ErrorResponse>).response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.status === 400) {
          ToastService.showError(axiosError.response?.data.Errors);
        }
        throw new Error(
          axiosError.response?.data.Message || "Erro desconhecido"
        );
      } else {
        throw new Error("Erro desconhecido");
      }
    }
  }
};

const cinemaService = {
  getUserByEmail,
  getRooms,
  getGiftCards,
  getCheckGiftCard,
  getRoomsByMovieTitle,
  createGiftCard,
  markTicketUsed,
};

export default cinemaService;
