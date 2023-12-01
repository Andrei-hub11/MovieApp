import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const Header = styled.header<AppearanceProps>`
  grid-area: headernav;
  padding: 1.2rem 1.6rem;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: ${({ $isUnique }) => ($isUnique ? "none" : "flex")};
    padding: 1rem 1.6rem;
    height: 8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    height: 13.4rem;
    padding: unset;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    position: sticky;
    display: flex;
    height: unset;
    padding: 1.2rem 1.6rem;
    z-index: 100;
  }
`;

export const ProfileImageContainer = styled.div<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-left: auto;
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    display: ${({ $isUnique }) => ($isUnique ? "none" : "block")};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    height: 13.4rem;
    width: 13.4rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    height: 17.2rem;
    width: 17.2rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const NavbarProfileImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

export const Navegation = styled.nav`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const BtnContainer = styled.div<AppearanceProps>`
  display: flex;
  gap: 1.2rem;

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: ${({ $isUnique }) => ($isUnique ? "none" : "")};
  }
`;

export const InputContainer = styled.div<AppearanceProps>`
  display: flex;
  align-items: center;
  gap: 0.9rem;

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: ${({ $isUnique }) => ($isUnique ? "none" : "")};
  }
`;

export const SearchInput = styled.input`
  width: 33.2rem;
  height: 3.4rem;
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  background: ${({ theme: { colors } }) => colors.bg};
  color: ${({ theme: { colors } }) => colors.text};
  padding-left: 1.5rem;
  caret-color: #fff;
  outline: none;

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.text};
  }
`;

export const IconContainer = styled.div<AppearanceProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => colors.primary_btn};
  border: ${({ theme: { colors }, $primary }) =>
    $primary ? `.2rem solid ${colors.text}` : ""};
`;
