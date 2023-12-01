import { InputsProps, BtnList, IconProps, IndicatorProps } from "../../types";

import {
  BtnContainer,
  Header,
  IconContainer,
  InputContainer,
  NavbarProfileImage,
  Navegation,
  ProfileImageContainer,
} from "./NavbarStyles";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";

import Anakin from "../../assets/profile-image.jpg";
import SearchIcon from "../../assets/ic_round-search.svg";
import Indicator from "../SectionIndicator/Indicator";

interface navProps {
  isUnique?: boolean;
  indicatorProps: IndicatorProps;
}

function Navbar({ isUnique, indicatorProps }: navProps) {
  const btnlist: BtnList[] = [
    {
      btn: { $primary: true, onClick: undefined },
      btn_text: "Ação",
    },
    {
      btn: { $primary: false, onClick: undefined },
      btn_text: "Ficção",
    },
    {
      btn: { $primary: false, onClick: undefined },
      btn_text: "Aventura",
    },
  ];

  const icon: IconProps = {
    $primary: true,
    src: SearchIcon,
    alt: "search-icon",
    onClick: undefined,
  };

  const inputProps: InputsProps = {
    placeholder: "Pesquise um filme",
    onChange: undefined,
  };

  return (
    <Header $isUnique={isUnique}>
      <ProfileImageContainer $isUnique={isUnique}>
        <NavbarProfileImage src={Anakin} alt="profile-image" />
      </ProfileImageContainer>
      <Navegation>
        <BtnContainer $isUnique={isUnique}>
          {btnlist.map((btn) => (
            <Button key={btn.btn_text} btn={btn.btn}>
              {btn.btn_text}
            </Button>
          ))}
        </BtnContainer>
        <InputContainer $isUnique={isUnique}>
          <Input input={inputProps}></Input>
          <IconContainer $primary>
            <Icon icon={icon} />
          </IconContainer>
        </InputContainer>
        {isUnique ? <Indicator indicator={indicatorProps} /> : null}
      </Navegation>
    </Header>
  );
}

export default Navbar;
