import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Formkit from "../../../components/Formkit/Formkit";
import { RegisterFormData, UserRegister } from "../../../types";
import { fieldsRegister } from "../../../utils/formfields/fields";
import { register, reset } from "../../../utils/account/sliceAccount";
import { useAppDispatch, useTypedSelector } from "../../../app/store";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useTypedSelector(
    (state) => state.account
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const currentPath: string = location.pathname;

  const handleRegisterAction = (values: RegisterFormData) => {
    const newUser: UserRegister = {
      UserName: values.name,
      Email: values.email,
      Password: values.password,
      Role: currentPath === "/register-admin" ? "Admin" : "User",
    };

    dispatch(register(newUser));
  };

  return (
    <div>
      <Formkit
        form={{
          fields: fieldsRegister,
          title: "Registre-se",
          renderKey: "2",
          btnText: "Registrar",
          handleRegisterAction,
        }}
      />
    </div>
  );
}

export default Register;
