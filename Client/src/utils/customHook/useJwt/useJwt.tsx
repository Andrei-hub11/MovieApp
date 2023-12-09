import Cookies from "cookies-js";

const manageJWTCookieState = () => {
  const token = Cookies.get("accessToken") || null;

  const saveToken = (newToken: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14);
    // Salvar o token nos cookies
    Cookies.set("accessToken", newToken, {
      expires: expirationDate,
      path: "/",
    });
  };

  const removeToken = () => {
    // Remover o token dos cookies
    Cookies.expire("accessToken");
  };

  return { token, saveToken, removeToken };
};

export default manageJWTCookieState;
