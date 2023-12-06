import Formkit from "../../../components/Formkit/Formkit";
import { RegisterFormData, UserRegister } from "../../../types";
import { fieldsRegister } from "../../../utils/formfields/fields";
import { register } from "../../../utils/account/sliceAccount";
import { useAppDispatch } from "../../../app/store";

function Register() {
  const dispatch = useAppDispatch();

  const handleRegisterAction = (values: RegisterFormData) => {
    const newUser: UserRegister = {
      UserName: values.name,
      Email: values.email,
      Password: values.password,
      Role: "User",
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
