import { motion } from "framer-motion";
import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const InnerContainerTickets = styled(motion.div)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 5.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    height: 59.2rem;
    overflow-y: auto;
    scrollbar-width: none; /* Para navegadores Firefox */
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Oculta a barra de rolagem no Chrome/Safari */
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    gap: 3.2rem;
    height: 60rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    height: 50rem;
  }
`;

export const ItemContainer = styled(motion.div)<AppearanceProps>`
  border: ${({ $isUsed, theme: { colors } }) =>
    $isUsed ? "solid .1rem #FF3030" : `solid .1rem ${colors.primary}`};
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.2rem 1.8rem;
    width: 28rem;
    min-height: ${({ $isUnique }) => ($isUnique ? "35rem" : "33rem")};
    border-radius: 0.5rem;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    gap: 1.7rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    min-height: ${({ $isUnique }) => ($isUnique ? "38rem" : "36rem")};
    width: 30.6rem;
  }
`;

export const ItemInnerContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const TicketInformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    min-width: 14rem;
    flex-direction: column;
  }
`;

export const MovieTitle = styled.h1`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    color: ${({ theme: { colors } }) => colors.text};
    font-family: ${({ theme: { fonts } }) => fonts[0]};
    text-transform: uppercase;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    font-size: 2.4rem;
  }
`;

export const MovieSubtitle = styled.p<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-wrap: wrap;
    max-width: ${({ $isUnique }) => ($isUnique ? "11rem" : "")};
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    letter-spacing: 0.1rem;
    color: ${({ theme: { colors } }) => colors.text};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    font-size: 1.8rem;
  }
`;

export const InformationTitle = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.6rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.text};
    text-transform: uppercase;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    font-size: 1.8rem;
  }
`;

export const TextInformation = styled(MovieSubtitle)`
  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    font-size: 1.6rem;
  }
`;

export const IconContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: absolute;
    left: 1.5rem;
    bottom: 1rem;
    height: 2.4rem;
    width: 2.4rem;
    cursor: pointer;
  }
`;
