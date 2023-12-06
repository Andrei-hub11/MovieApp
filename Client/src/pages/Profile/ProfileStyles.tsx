import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const ProfileContainer = styled.main`
  grid-area: main;
`;

export const ProfileInformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    padding: 1rem 0;
    width: 100%;
    align-items: center;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    border-radius: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    margin: 13rem auto;
    max-width: 60rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    max-width: 63.8rem;
    padding: 3rem 0;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    margin: 0 1.7rem;
  }
`;

export const ContainerInner = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    min-width: 34rem;
    gap: 3rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 46rem;
  }
`;

export const ProfileImage = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    object-fit: cover;
    height: 9.4rem;
    width: 9.4rem;
    border-radius: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 11.2rem;
    height: 10.8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    width: 12.5rem;
    height: 12.1rem;
  }
`;
/* 
export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  p {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;
  }
`; */

export const ProfileText = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;
  }
`;

export const BtnContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1.7rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    align-items: center;
    justify-content: center;
    gap: 20rem;
  }
`;

export const ProfileBtn = styled.a<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    text-align: center;
    font-size: 1.4rem;
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    letter-spacing: 0.1rem;
    background: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.tertiary : colors.secondary_bg};
    color: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.bg : colors.text};
    padding: 0.6rem 2.5rem;
    cursor: pointer;
    font-weight: 400;
    border-radius: 1rem;
    border: ${({ theme: { colors }, $primary }) =>
      $primary
        ? `solid .2rem ${colors.tertiary}`
        : `solid .2rem ${colors.secondary_bg}`};
    outline: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: ${({ $primary }) => ($primary ? "block" : "none")};
  }
`;

export const CodeContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 5.4rem;
    width: 100%;
    padding: 0 1.7rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    margin: 5.4rem auto;
    width: 60rem;
  }
`;

export const InnerCodeContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1.2rem;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    border-radius: 0.5rem;

    img {
      cursor: pointer;
    }
  }
`;

export const Information = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
  }
`;