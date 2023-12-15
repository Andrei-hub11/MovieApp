import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../types";
import manageJWTCookieState from "../customHook/useJwt/useJwt";

const API_URL = import.meta.env.VITE_MOVIE_APP_API_URL + "/api/v1/";

const getOrderId = async () => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + "order-id", {
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

const purchaseService = {
  getOrderId,
};

export default purchaseService;
