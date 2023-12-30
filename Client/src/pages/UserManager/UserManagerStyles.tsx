import styled from "styled-components";
import { motion } from "framer-motion";

import { AppearanceProps } from "../../types";

export const UserManagerContainer = styled(motion.div)`
  grid-area: main;
  position: relative;
`;

export const ArrowIcon = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const NavContainer = styled(motion.div)<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin: ${({ $primary }) => ($primary ? "6rem auto" : "6rem 0")};
    display: flex;
    justify-content: ${({ $primary }) =>
      $primary ? "space-between" : "center"};
    gap: 1.8rem;
    width: ${({ $primary }) => ($primary ? "90%" : "100%")};
  }
`;

export const Input = styled.input<AppearanceProps>`
  width: 33.2rem;
  height: 3.4rem;
  border: ${({ $primary }) =>
    $primary ? "0.2rem solid #fff" : "0.2rem solid #ff0000"};
  border-radius: 2rem;
  background: ${({ theme: { colors } }) => colors.bg};
  color: ${({ theme: { colors } }) => colors.text};
  padding-left: 1.5rem;
  caret-color: #fff;
  outline: none;

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.text};
  }

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    width: 30rem;
  }
`;

export const IconContainer = styled.div<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    background: ${({ theme: { colors } }) => colors.primary_btn};
    border: ${({ theme: { colors }, $primary }) =>
      $primary ? `.2rem solid ${colors.text}` : ""};
  }
`;

export const UserContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin: 3rem auto;
    width: 38.2rem;
    height: 14.5rem;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    border-radius: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 45.2rem;
    height: 16rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    width: 53.2rem;
    height: 18rem;
  }
`;

export const UserInnerContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 36.14rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 40rem;
  }
`;

export const UserImageContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    height: 7.5rem;
    width: 7.5rem;
    border-radius: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    height: 8.5rem;
    width: 8.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    width: 10.5rem;
    height: 10.5rem;
  }
`;

export const UserImage = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    object-fit: cover;
    height: 7.5rem;
    width: 7.5rem;
    border-radius: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    height: 8.5rem;
    width: 8.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    width: 10.5rem;
    height: 10.5rem;
  }
`;

export const InformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
`;

export const UserInformation = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    color: ${({ theme: { colors } }) => colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    font-size: 1.8rem;
  }
`;

export const ContainerBtn = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 0.5rem;
    display: flex;
    width: 36.14rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 42rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    width: 90%;
  }
`;

export const UserBtn = styled.a<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-left: auto;
    text-align: center;
    font-size: 1.6rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    letter-spacing: 0.1rem;
    background: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.tertiary : colors.primary};
    color: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.bg : colors.light};
    padding: 0.6rem 1.6rem;
    cursor: pointer;
    font-weight: 400;
    border-radius: 0.5rem;
    outline: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    padding: 0.8rem 1.6rem;
  }
`;

export const SelectedTickets = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: ${({ theme: { colors } }) => colors.bg};
    width: 3.2rem;
    height: 3.2rem;
    border: ${({ theme: { colors } }) => `solid .2rem ${colors.primary}`};
    background: ${({ theme: { colors } }) => colors.light};
    border-radius: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    font-size: 1.6rem;
    width: 3.5rem;
    height: 3.5rem;
  }
`;
