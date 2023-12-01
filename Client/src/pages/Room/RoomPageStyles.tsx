import { motion } from "framer-motion";
import styled from "styled-components";

import { AppearanceGroupProps, AppearanceProps } from "../../types";

export const RoomContainer = styled.div`
  grid-area: main;
`;

export const RoomImageContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: relative;
    width: 100%;
    height: auto;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    height: 45rem;
  }
`;

export const MovieImage = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

export const ArrowIcon = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`;

export const MovieTitleContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2.2rem;
    display: flex;
    flex-direction: column;
    padding: 0 2.4rem;
  }
`;

export const MovieTitle = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 2rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: bold;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 2.4rem;
  }
`;

export const MovieSubtitle = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
  }
`;

export const Container = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 1.8rem;
    display: flex;
    justify-content: center;
  }
`;

export const SeatsContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    row-gap: 1rem;
    width: 34rem;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 36rem;
  }
`;

export const GroupContainer = styled.div<AppearanceGroupProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: ${({ $hasMargin }) => ($hasMargin ? $hasMargin : "")};
    display: flex;
  }
`;

export const GroupInner = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 0.3rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 0.5rem;
  }
`;

export const ItemContainer = styled.div``;

export const SeatsItems = styled.div<AppearanceGroupProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 0.3rem;
    margin-right: ${({ $hasMargin }) => ($hasMargin ? $hasMargin : "")};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 0.5rem;
  }
`;

export const InformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 1.4rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 3rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    gap: 6rem;
  }
`;

export const InnerInformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const Information = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 400;
    color: ${({ theme: { colors } }) => colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
  }
`;

export const InformationBall = styled.div<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    content: "";
    background: ${({ $hasColor, theme: { colors } }) =>
      $hasColor ? $hasColor : colors.text};
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    height: 1.4rem;
    width: 1.4rem;
  }
`;

export const DateContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2.5rem;
    padding: 0 3rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    padding: 0 8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    padding: 0 12rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    padding: 0 18rem;
  }
`;

export const DateCarousel = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    cursor: grab;
    overflow: hidden;
    width: 100%;
  }
`;

export const DateCarouselInner = styled(motion.div)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 2rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 2.5rem;
  }
`;

export const CarouselItemContainer = styled(motion.div)<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    padding: 1rem;
    min-width: 4.6rem;
    min-height: 5rem;
    background: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.primary : colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    min-width: 6rem;
    min-height: 7.4rem;
    gap: 0.45rem;
  }
`;
export const Item = styled.p<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 400;
    color: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.light : colors.bg};
    pointer-events: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
  }
`;

export const HoursContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 3.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    margin-top: 4.5rem;
  }
`;

export const HourItem = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    padding: 0.5rem 0.8rem;
    background: ${({ theme: { colors } }) => colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
    padding: 0.8rem 1rem;
  }
`;

export const RoomNav = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: fixed;
    display: flex;
    justify-content: center;
    gap: 3rem;
    width: 100%;
    bottom: 2rem;
  }
`;

export const PriceInformation = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.5rem;
    color: #fff;
    border: 1px solid #fff;
    padding: 1rem 0.8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.8rem;
  }
`;

export const RoomBtn = styled.a<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    text-align: center;
    font-size: 1.6rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    letter-spacing: 0.1rem;
    background: ${({ theme: { colors } }) => colors.primary_btn};
    color: ${({ theme: { colors } }) => colors.secundary_text};
    width: 20rem;
    padding: 0.6rem 2.5rem;
    cursor: pointer;
    font-weight: 400;
    border-radius: 1rem;
    border: ${({ theme: { colors } }) => `.2rem solid ${colors.primary_btn}`};
    outline: none;

    &:hover {
      background: ${({ theme: { colors }, $primary }) =>
        $primary ? "#fff" : colors.primary_btn};
      border: ${({ theme: { colors }, $primary }) =>
        $primary ? `.2rem solid ${colors.primary_btn}` : ""};
      color: ${({ theme: { colors }, $primary }) =>
        $primary ? "#000" : colors.secundary_btn};
      transition: 0.3s ease-out;
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
    width: 28rem;
    padding: 0.8rem 1.6rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    font-size: 1.8rem;
    width: 30.15rem;
    padding: 0.8rem 2.5rem;
  }
`;
