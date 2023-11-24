import { motion } from "framer-motion";
import styled from "styled-components";

export const CentralSection = styled.main`
  grid-area: main;
  overflow-y: auto;
`;

export const Container = styled.div`
  margin-top: 4rem;

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2.7rem;
  }
`;

export const NavInputContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    gap: 1.8rem;
    width: 100%;
  }
`;

export const CategoryContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 2.7rem;
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    gap: 1.5rem;
  }
`;

export const CategoryContainerTitle = styled.div`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    p {
      font-size: 1.6rem;
      font-family: ${({ theme: { fonts } }) => fonts[1]};
      font-weight: bold;
      color: ${({ theme: { colors } }) => colors.text};
    }
  }
`;

export const BtnsContainer = styled.div`
  display: flex;

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 1.5rem;
  }
`;

export const PostersContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 3rem;
    display: flex;
    padding: 0 3rem;
    flex-direction: column;
    gap: 2.1rem;
  }
`;

export const PostersContainerTitle = styled.div`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    p {
      font-size: 1.4rem;
      font-family: ${({ theme: { fonts } }) => fonts[1]};
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme: { colors } }) => colors.text};
      letter-spacing: 0.1rem;
    }
  }
`;

export const PostersCarousel = styled(motion.div)`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    cursor: grab;
    overflow: hidden;
    width: 100%;
  }
`;

export const PostersCarouselInner = styled(motion.div)`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 2rem;
  }
`;

export const CarouselItem = styled(motion.div)`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    min-height: 13rem;
    min-width: 9rem;
  }
`;

export const CarouselImage = styled(motion.img)`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
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

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: none;
  }
`;

export const SliderContainer = styled.div`
  p {
    color: #fff;
  }
`;

export const SliderImg = styled.img`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    object-fit: cover;
    width: 100%;
    height: auto;
    border-radius: 1rem;
  }
`;
