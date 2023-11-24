import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();

  const redirectTo = (to: string) => {
    navigate(to);
  };

  return { redirectTo };
};

export default useRedirect;
