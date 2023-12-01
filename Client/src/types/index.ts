import { ReactElement } from "react";

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

interface Movie {
  imageSrc: string;
  altText: string;
  status: string;
  buttonText: string;
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
