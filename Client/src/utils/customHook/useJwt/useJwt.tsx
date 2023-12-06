import Cookies from "cookies-js";

const manageJWTCookieState = () => {
  const token = Cookies.get("accessToken") || null;

  const saveToken = (newToken: string) => {
    // Salvar o token nos cookies
    Cookies.set("accessToken", newToken, { path: "/" });
  };

  const removeToken = () => {
    // Remover o token dos cookies
    Cookies.expire("accessToken");
  };

  return { token, saveToken, removeToken };
};

export default manageJWTCookieState;
