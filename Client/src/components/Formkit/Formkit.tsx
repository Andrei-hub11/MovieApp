import { useState } from "react";
import { FormikHelpers, FormikValues, useFormik } from "formik";
import * as yup from "yup";

import {
  Actions,
  FormProps,
  IconProps,
  LoginFormData,
  RegisterFormData,
} from "../../types";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

import {
  AccountBtn,
  CheckboxContainer,
  CheckboxText,
  Container,
  Form,
  FormContainer,
  FormControl,
  FormIcon,
  FormInput,
  FormMsg,
  FormTitle,
  InformationText,
} from "./FormkitStyles";

import Icon from "../Icon/Icon";
import CheckboxIcon from "../../assets/checkbox.svg";
import VisibilityOffIcon from "../../assets/invisible-solid.svg";
import CheckboxVariantIcon from "../../assets/checkbox-variant.svg";

interface formProps {
  form: FormProps;
}

interface FormValues {
  [key: string]: string;
}

interface VisibilityPasswordState {
  [key: string]: boolean;
}

function Formkit({ form }: formProps) {
  const {
    fields,
    title,
    renderKey,
    btnText,
    handleRegisterAction,
    handleLoginAction,
  } = form;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { redirectTo } = useRedirect();

  const [visiblePassword, setVisiblePassword] =
    useState<VisibilityPasswordState>({});

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
        fields.map((field) => [
          field.name,
          field.validation ||
            yup.string().required(`${field.label} é requerido`),
        ])
      )
    );

  const handleChangeIcon = () => {
    setIsChecked(!isChecked);
  };

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

  const iconProps: IconProps = {
    src: isChecked ? CheckboxVariantIcon : CheckboxIcon,
    alt: "ícone do checkbox",
    onClick: handleChangeIcon,
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

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>
        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormControl key={field.name}>
              <FormInput
                placeholder={field.label}
                type={visiblePassword[field.name] ? "text" : field.type}
                value={values[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                id={field.name}
                autoComplete="off"
                aria-autocomplete="none"
              />
              <FormIcon
                src={
                  (field.name === "password" ||
                    field.name === "passwordConfirmation") &&
                  visiblePassword[field.name]
                    ? VisibilityOffIcon
                    : field.iconSrc
                }
                alt={`ícone ${field.name} do form`}
                onClick={() =>
                  field.type && handlePasswordVisibility(field.name)
                }
              />
              <FormMsg
                $isUnique={
                  errors[field.name] && touched[field.name] ? true : false
                }
              >
                {errors[field.name] && touched[field.name] && (
                  <>{errors[field.name]}</>
                )}
              </FormMsg>
            </FormControl>
          ))}
        </Form>
        <CheckboxContainer>
          <Icon icon={iconProps} />
          <CheckboxText>Lembre-se de mim</CheckboxText>
        </CheckboxContainer>
        <AccountBtn disabled={isSubmitting} onClick={handleSubmitClick}>
          {btnText}
        </AccountBtn>
        <div>{actions[renderKey]()}</div>
      </FormContainer>
    </Container>
  );
}

export default Formkit;
