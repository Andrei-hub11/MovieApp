import * as yup from "yup";

import { Field } from "../../types";

import EmailIcon from "../../assets/ic_baseline-email.svg";
import PasswordIcon from "../../assets/streamline_visible-solid.svg";
import UserIcon from "../../assets/bxs_user.svg";

export const fieldsLogin: Field[] = [
  {
    name: "email",
    label: "Adicione um email",
    validation: yup
      .string()
      .email("Digite um email válido")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "Siga o formato padrão de endereços de email"
      )
      .required("O email é obrigatório"),
    iconSrc: EmailIcon,
  },
  {
    name: "password",
    label: "Diga-me sua senha",
    validation: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .matches(/^(?=.*[a-z])/, "Deve conter pelo menos 1 letra minúscula")
      .matches(/^(?=.*[A-Z])/, "Deve conter pelo menos 1 letra maiúscula")
      .matches(
        /^(?=(?:[^!@#$%^&*]*[!@#$%^&*]){2})([A-Za-z\d!@#$%^&*]+)$/,
        "Deve conter pelo menos 2 caracteres especiais"
      )
      .required("A senha é obrigatória"),
    type: "password",
    iconSrc: PasswordIcon,
  },
];

export const fieldsRegister: Field[] = [
  {
    name: "name",
    label: "Nome",
    validation: yup.string().required("O nome é obrigatório"),
    iconSrc: UserIcon,
  },
  {
    name: "email",
    label: "Adicione um email",
    validation: yup
      .string()
      .email("Digite um email válido")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "Siga o formato padrão de endereços de email"
      )
      .required("O email é obrigatório"),
    iconSrc: EmailIcon,
  },

  {
    name: "password",
    label: "Diga-me uma senha",
    validation: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .matches(/^(?=.*[a-z])/, "Deve conter pelo menos 1 letra minúscula")
      .matches(/^(?=.*[A-Z])/, "Deve conter pelo menos 1 letra maiúscula")
      .matches(
        /^(?=(?:[^!@#$%^&*]*[!@#$%^&*]){2})([A-Za-z\d!@#$%^&*]+)$/,
        "Deve conter pelo menos 2 caracteres especiais"
      )
      .required("A senha é obrigatória"),
    type: "password",
    iconSrc: PasswordIcon,
  },
  {
    name: "passwordConfirmation",
    label: "Confirme a senha",
    validation: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "As senhas devem coincidir")
      .required("A confirmação de senha é obrigatória"),
    type: "password",
    iconSrc: PasswordIcon,
  },
];
