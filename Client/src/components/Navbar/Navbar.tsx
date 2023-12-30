import { InputsProps, IconProps, IndicatorProps } from "../../types";

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

import SearchIcon from "../../assets/ic_round-search.svg";
import Indicator from "../SectionIndicator/Indicator";
import useNavBar from "./useNavBar";
import defaultProfilePicture from "../../assets/imagem de perfil default.png";

interface navProps {
  isUnique?: boolean;
  indicatorProps: IndicatorProps;
}

function Navbar({ isUnique, indicatorProps }: navProps) {
  const { User, btnList, handleSearchMovie } = useNavBar();

  const icon: IconProps = {
    $primary: true,
    src: SearchIcon,
    alt: "search-icon",
    onClick: undefined,
  };

  const inputProps: InputsProps = {
    placeholder: "Pesquise um filme",
    onChange: handleSearchMovie,
  };

  return (
    <Header $isUnique={isUnique}>
      <ProfileImageContainer $isUnique={isUnique}>
        <NavbarProfileImage
          src={
            User.ProfileImagePath
              ? import.meta.env.VITE_MOVIE_APP_API_URL + User.ProfileImagePath
              : defaultProfilePicture
          }
          alt="imagem de perfil"
        />
      </ProfileImageContainer>
      <Navegation>
        <BtnContainer $isUnique={isUnique}>
          {btnList?.map((btn) => (
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
