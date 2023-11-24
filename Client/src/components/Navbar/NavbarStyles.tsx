import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const Header = styled.header`
  grid-area: headernav;
  padding: 1.2rem 1.6rem;

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    overflow: hidden;
    padding: 1rem 1.6rem;
    height: 8rem;
  }
`;

export const ProfileImageContainer = styled.div`
  margin-left: auto;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
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

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: none;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
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
