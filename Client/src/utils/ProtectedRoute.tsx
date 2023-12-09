import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getMe, reset } from "./account/sliceAccount";
import { useAppDispatch, useTypedSelector } from "../app/store";
import manageJWTCookieState from "./customHook/useJwt/useJwt";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carregamento
  const dispatch = useAppDispatch();

  const { token } = manageJWTCookieState();
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    // Dispara uma ação 'getMe' com o token para autenticar o usuário.
    dispatch(getMe(token))
      .then(() => {
        setIsLoading(false); // Ação concluída
        dispatch(reset());
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [token, dispatch]);

  const account = useTypedSelector((state) => state.account);

  const location = useLocation();

  if (isLoading) {
    return;
  }

  // Se não houver um usuário autenticado, redireciona para a página de login, incluindo a localização atual.
  if (!account.User.Id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
