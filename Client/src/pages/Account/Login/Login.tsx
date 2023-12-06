import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../app/store";
import Formkit from "../../../components/Formkit/Formkit";
import { LoginFormData, UserLogin } from "../../../types";
import { login, reset } from "../../../utils/account/sliceAccount";
import { fieldsLogin } from "../../../utils/formfields/fields";
import { useTypedSelector } from "../../../app/store";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useTypedSelector((state) => state.account);

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isSuccess, dispatch]);

  const handleLoginAction = (values: LoginFormData) => {
    const user: UserLogin = {
      Email: values.email,
      Password: values.password,
    };

    dispatch(login(user));
  };

  return (
    <div>
      <Formkit
        form={{
          fields: fieldsLogin,
          title: "Login",
          renderKey: "1",
          btnText: "Entrar",
          handleLoginAction,
        }}
      />
    </div>
  );
}

export default Login;
