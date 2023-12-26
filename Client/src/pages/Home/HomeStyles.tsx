import { motion } from "framer-motion";
import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const CentralSection = styled.main`
  grid-area: main;
  overflow-y: auto;

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: flex;
    flex-direction: column;
    gap: 12rem;
    &::-webkit-scrollbar-thumb {
      background: ${({ theme: { colors } }) => colors.secondary_bg};
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme: { colors } }) => colors.bg};
    }
    &::-webkit-scrollbar {
      width: 1rem;
      background-color: ${({ theme: { colors } }) => colors.secondary_bg};
    }
  }
`;

export const Container = styled.div`
  margin-top: 4rem;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2.7rem;
  }
`;

export const NavInputContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    gap: 1.8rem;
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    gap: 3rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const CategoryContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2.7rem;
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    gap: 1.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    padding: 0 5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    padding: 0 9.1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const CategoryContainerTitle = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    p {
      font-size: 1.6rem;
      font-family: ${({ theme: { fonts } }) => fonts[1]};
      font-weight: bold;
      color: ${({ theme: { colors } }) => colors.text};
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    p {
      font-size: 2rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    p {
      font-size: 2.4rem;
    }
  }
`;

export const BtnsContainer = styled.div`
  display: flex;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 1.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 1.8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    gap: 2.6rem;
  }
`;

export const PostersContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 3rem;
    display: flex;
    padding: 0 3rem;
    flex-direction: column;
    gap: 2.1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    padding: 0 5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    padding: 0 9.1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const PostersContainerTitle = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    p {
      font-size: 1.4rem;
      font-family: ${({ theme: { fonts } }) => fonts[1]};
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme: { colors } }) => colors.text};
      letter-spacing: 0.1rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    p {
      font-size: 1.8rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    p {
      font-size: 2rem;
    }
  }
`;

export const PostersCarousel = styled(motion.div)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    cursor: grab;
    overflow: hidden;
    width: 100%;
  }
`;

export const PostersCarouselInner = styled(motion.div)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 2rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 3rem;
  }
`;

export const CarouselItem = styled(motion.div)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    min-height: 13rem;
    min-width: 9rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    min-height: 20.3rem;
    min-width: 13.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    min-height: 26.2rem;
    min-width: 18rem;
  }
`;

export const CarouselImage = styled(motion.img)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

export const FlexContainer = styled.div`
  margin: 0 auto;
  height: 40rem;
  width: 80rem;
  border-color: white;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: block;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  p {
    color: #fff;
  }
`;

export const InnerSliderContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  left: 7rem;
  bottom: 5rem;
`;

export const Information = styled.h1<AppearanceProps>`
  font-family: ${({ theme: { fonts } }) => fonts[0]};
  font-size: 2.2rem;
  font-weight: bold;
  color: ${({ theme: { colors }, $primary }) =>
    $primary ? colors.bg : colors.text};
`;

export const SliderBtn = styled.a`
  font-family: ${({ theme: { fonts } }) => fonts[0]};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.primary};
  padding: 1rem 3rem;
  background: ${({ theme: { colors } }) => colors.bg};
  border-radius: 1rem;
  cursor: pointer;
`;

export const SliderImg = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    object-fit: cover;
    width: 100%;
    height: auto;
    border-radius: 1rem;
  }
`;

export const MoveListContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: flex;
    justify-content: center;
    gap: 3.6rem;
    width: 100%;
  }
`;

export const MovieContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    width: 15rem;
    height: 19rem;
  }
`;

export const MovieImage = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    object-fit: cover;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
