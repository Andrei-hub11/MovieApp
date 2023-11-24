import { ReactElement } from "react";

export interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
}

export interface IconProps {
  $primary?: boolean;
  src: string;
  alt: string;
  onClick?: () => void | undefined;
}

export interface ButtonProps {
  $primary: boolean;
  onClick?: () => void | undefined;
}

export interface IndicatorProps {
  sectionName: string;
  src: string;
  alt: string;
}

export interface InputsProps {
  placeholder?: string;
  onChange?: () => void | undefined;
}

export interface BtnList {
  btn: ButtonProps;
  btn_text: string;
}

export interface DateList {
  day: string;
  date: string;
}

export interface LinkList {
  icon: IconProps;
  name: string;
  $primary: boolean;
}

export interface AppearanceProps {
  $primary?: boolean;
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

export interface AppearanceBallProps {
  $hasColor?: string;
}

export interface RouteObject {
  path: string;
  element: ReactElement;
}

export interface IconsList {
  route: string;
  default: string;
  selected?: string;
}
