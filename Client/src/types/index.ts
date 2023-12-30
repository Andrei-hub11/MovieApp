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
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void | undefined;
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export interface BtnList {
  btn: ButtonProps;
  btn_text: string;
}

export interface DateList {
  Id: string;
  day: string;
  date: string;
}

export interface LinkList {
  icon: IconProps;
  name: string;
  $primary: boolean;
}

export interface EventDateTime {
  Date: Date;
  Time: Date | string;
}

export interface TicketData {
  MovieTitle: string;
  MovieSubtitle?: string;
  OrderId: string;
  AmountPaid: number;
  EventDateTime: EventDateTime;
  RoomNumber: string;
  PurchasedSeats: string[];
  UserId: string;
}

export interface UserTickets extends TicketData {
  Id: string;
  IsUsed: boolean;
  CreatedAt: Date;
  UpdatedAt: Date | null;
}

export interface AppearanceProps {
  $primary?: boolean;
  $hasColor?: string;
  $hasMargin?: string;
  $isSelected?: boolean;
  $isUnique?: boolean;
  $isUsed?: boolean;
  $isValid?: boolean | string;
  disabled?: boolean;
}

export interface Seat {
  Id: string;
  IsReserved: boolean;
  SeatNumber: string[];
  SeatPrice: number;
  RoomId: string;
  gap: string | null;
}

export interface SeatsGroup {
  group: number;
  seats: Seat[];
}

export interface Room {
  Id: string;
  MovieTitle: string;
  MovieSubtitle: string;
  RoomNumber: string;
  MovieCategory: string;
  MovieImagePath: string;
  MovieBackdropPath: string;
  EventDateTime: Date;
  Seats: Seat[];
}

export interface User {
  Id: string;
  UserName: string;
  Email: string;
  ProfileImagePath: string | null;
  Tickets: [] | UserTickets[];
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

export interface UpdateUser {
  UserName: string;
  Email: string;
}

export interface UpdateImage {
  Id: string;
  image: FormData;
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

export interface GiftCard {
  Id: string;
  GiftCodigo: string;
  IsUsed: boolean | undefined;
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

export interface ErrorResponse {
  Message: string;
  Error: [] | "";
  Errors: [] | "";
}
