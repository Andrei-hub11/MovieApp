import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const Aside = styled.aside`
  grid-area: sidebar;
  border-right: 0.02rem solid rgba(255, 255, 255, 0.81);
  height: 100vh;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: block;
    position: fixed;
    min-width: 24rem;
  }
`;

export const Sidemenu = styled.nav``;

export const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileImage = styled.img`
  margin-top: 2.4rem;
  border-radius: 50%;
  width: 14rem;
  height: 13.6rem;
  object-fit: cover;
`;

export const SideList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 4.5rem;
  margin-left: 1.4rem;
  list-style: none;
  gap: 2rem;
`;

export const SideLInk = styled.li<AppearanceProps>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  width: fit-content;
  font-family: ${({ theme: { fonts } }) => fonts[0]};
  gap: 1rem;
  padding: 0.3rem 0.5rem;
  color: #fff;
  cursor: pointer;

  &::after {
    position: absolute;
    content: "";
    height: 100%;
    width: ${({ $primary }) => ($primary ? "100%" : "0")};
    background-color: ${({ $primary, theme: { colors } }) =>
      $primary ? colors.primary : ""};
    border-radius: 0 2rem 2rem 0;
    z-index: -1;
    transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out; /* Transições de largura e cor */
  }

  &:hover::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background-color: ${({ $primary, theme: { colors } }) =>
      $primary ? "" : colors.primary};
    border-radius: 0 2rem 2rem 0;
    z-index: -1;
    transition: width 0.3s ease-in-out;
  }
`;
