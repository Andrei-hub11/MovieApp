import { ReactElement } from "react";
import * as yup from "yup";

export interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  prevArrow: React.ReactElement;
  nextArrow: React.ReactElement;
}

export interface IconProps {
  $primary?: boolean;
  srcset?: string;
  src: string;
  alt: string;
  onClick?: () => void | undefined;
}

export interface ButtonProps {
  $primary: boolean;
  onClick?: () => void | undefined;
  $isUnique?: boolean;
}

export interface MovieSlider {
  imageSrc: string;
  altText: string;
  status: string;
  buttonText: string;
  $primary?: boolean;
}

export interface Field {
  name: string;
  label: string;
  validation: yup.StringSchema<string>;
  type?: string;
  iconSrc?: string;
}

export interface FormProps {
  title: string;
  fields: Field[];
  renderKey: string;
  btnText: string;
  handleRegisterAction?: (values: RegisterFormData) => void;
  handleLoginAction?: (values: LoginFormData) => void;
}

export interface Actions {
  [key: string]: () => React.ReactNode;
}

export interface AvailableRoutes {
  [key: string]: (route: string) => boolean;
}

export interface IndicatorProps {
  sectionName: string;
  src: string;
  alt: string;
}

export interface InputsProps {
  placeholder?: string;
  $isError?: string;
  onChange?: () => void | undefined;
}

export interface BtnList {
  btn: ButtonProps;
  btn_text: string;
}

export interface DateList {
  id: string;
  day: string;
  date: string;
}

export interface LinkList {
  icon: IconProps;
  name: string;
  $primary: boolean;
}

export interface TicketList {
  id: string;
  orderId: string;
  title: string;
  subtitle?: string;
  eventTime: Date;
  eventDate: Date;
  roomNumber: string;
  amountPaid: number;
  purcheadSeats: string[];
  isUsed: boolean;
}

export interface AppearanceProps {
  $primary?: boolean;
  $hasColor?: string;
  $isSelected?: boolean;
  $isUnique?: boolean;
  $isUsed?: boolean;
  disabled?: boolean;
}

export interface User {
  Id: string;
  UserName: string;
  Email: string;
  ProfileImagePath: string | null;
  Tickets: [];
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserLogin {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  Token: string;
  User: User;
  Role: "Admin" | "User";
}

export interface UserRegister {
  UserName: string;
  Email: string;
  Password: string;
  Role: "Admin" | "User";
}

export interface GridContainerProps {
  $templateAreas: string;
  $currentPath: string;
}

export interface AppearanceNavBottomProps {
  $isSelected?: boolean;
}

export interface AppearanceGroupProps {
  $hasMargin?: string;
}

export interface RouteObject {
  path: string;
  element: ReactElement;
}

export interface IconsList {
  name: string;
  route: string;
  default: string;
  selected: string;
}
