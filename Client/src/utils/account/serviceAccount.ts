import axios from "axios";
import { UserLogin, UserRegister } from "../../types";
import Cookies from "cookies-js";
import manageJWTCookieState from "../customHook/useJwt/useJwt";

//definindo endpoint
const API_URL = import.meta.env.VITE_MOVIE_APP_API_URL + "/api/v1/";

const login = async (userData: UserLogin) => {
  const { data } = await axios.post(API_URL + "login", userData);

  const { Token } = data;

  const { saveToken } = manageJWTCookieState();
  saveToken(Token);

  return data;
};

const register = async (userData: UserRegister) => {
  const { data } = await axios.post(API_URL + "register", userData);

  const { Token } = data;

  const { saveToken } = manageJWTCookieState();
  saveToken(Token);

  return data;
};

const getMe = async (accessToken: string) => {
  const response = await axios.get(API_URL + "get-me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const logout = () => {
  Cookies.expire("accessToken");

  return null;
};

const accountService = {
  register,
  login,
  getMe,
  logout,
};

export default accountService;
