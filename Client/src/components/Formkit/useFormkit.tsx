import { useState } from "react";

import * as yup from "yup";
import { useTypedSelector } from "../../app/store";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";
import { InformationText } from "./FormkitStyles";
import {
  Actions,
  LoginFormData,
  RegisterFormData,
  FormProps,
} from "../../types";
import { FormikHelpers, FormikValues, useFormik } from "formik";

interface FormValues {
  [key: string]: string;
}

interface VisibilityPasswordState {
  [key: string]: boolean;
}
const useFormKit = (form: FormProps) => {
  const { fields, handleRegisterAction, handleLoginAction } = form;
  const { isLoading } = useTypedSelector((state) => state.account);
  const { redirectTo } = useRedirect();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] =
    useState<VisibilityPasswordState>({});

  const handleChangeIcon = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordVisibility = (name: string) => {
    setVisiblePassword((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? false : true,
    }));
  };

  const initialValues: FormValues = Object.fromEntries(
    fields.map((field) => [field.name, ""])
  );

  const validations = yup
    .object()
    .shape(
      Object.fromEntries(
        form.fields.map((field) => [
          field.name,
          field.validation ||
            yup.string().required(`${field.label} é requerido`),
        ])
      )
    );

  const actions: Actions = {
    "1": () => (
      <InformationText>
        Ou{" "}
        <a onClick={() => redirectTo("/register")} role="register-link">
          registre-se
        </a>
        , se ainda não possui uma conta
      </InformationText>
    ),
    "2": () => (
      <InformationText>
        Ou faça{" "}
        <a onClick={() => redirectTo("/login")} role="login-link">
          login
        </a>
        , se possui uma conta
      </InformationText>
    ),
  };

  function isRegisterFormData(
    data: Partial<RegisterFormData>
  ): data is RegisterFormData {
    return (
      typeof data?.name === "string" &&
      typeof data?.email === "string" &&
      typeof data?.password === "string" &&
      typeof data?.passwordConfirmation === "string"
    );
  }

  function isLoginFormData(
    data: Partial<LoginFormData>
  ): data is LoginFormData {
    return (
      typeof data?.email === "string" && typeof data?.password === "string"
    );
  }

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (isRegisterFormData(values)) {
      const registerData: RegisterFormData = values;
      handleRegisterAction && handleRegisterAction(registerData);
    }

    if (isLoginFormData(values)) {
      const loginData: LoginFormData = values;
      handleLoginAction && handleLoginAction(loginData);
    }

    actions.resetForm();
  };

  const handleSubmitClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleSubmit();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<FormikValues>({
    initialValues,
    validationSchema: validations,
    onSubmit,
  });

  return {
    fields,
    values,
    errors,
    touched,
    isSubmitting,
    isLoading,
    initialValues,
    validations,
    actions,
    isChecked,
    visiblePassword,
    useRedirect,
    setIsChecked,
    setVisiblePassword,
    handleChangeIcon,
    handleBlur,
    handleChange,
    handlePasswordVisibility,
    onSubmit,
    handleSubmit,
    handleSubmitClick,
  };
};

export default useFormKit;
