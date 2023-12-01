import { IconProps } from "../../types";
import { IconImg } from "./IconStyles";

interface IconsProps {
  icon: IconProps;
}

function Icon({ icon }: IconsProps) {
  const { $primary, src, alt, onClick } = icon;
  return (
    <IconImg
      src={src}
      $primary={$primary}
      alt={alt}
      onClick={onClick}
      loading="eager"
      height={24}
      width={24}
    />
  );
}

export default Icon;
