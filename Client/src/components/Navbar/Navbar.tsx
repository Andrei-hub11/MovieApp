import { InputsProps, BtnList, IconProps } from "../../types";

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

function Navbar() {
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
    <Header>
      <ProfileImageContainer>
        <NavbarProfileImage src={Anakin} alt="profile-image" />
      </ProfileImageContainer>
      <Navegation>
        <BtnContainer>
          {btnlist.map((btn) => (
            <Button key={btn.btn_text} btn={btn.btn}>
              {btn.btn_text}
            </Button>
          ))}
        </BtnContainer>
        <InputContainer>
          <Input input={inputProps}></Input>
          <IconContainer $primary>
            <Icon icon={icon} />
          </IconContainer>
        </InputContainer>
      </Navegation>
    </Header>
  );
}

export default Navbar;
