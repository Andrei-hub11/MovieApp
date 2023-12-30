import styled from "styled-components";
import { AppearanceProps } from "../../types";
import { motion } from "framer-motion";

export const NotificationContainer = styled.div`
  grid-area: main;
`;

export const ContainerInner = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Notification = styled(motion.div)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    padding: 2rem 3.65rem;
    width: 32rem;
    height: auto;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    border-radius: 1.5rem 1.5rem 1.5rem 0;
    overflow: hidden;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    padding: 1.5rem 5rem;
    width: 48.4rem;
  }
`;

export const ClearBtnContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ClearBtnInnerContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }
`;

export const ClearBtn = styled.a<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-left: auto;
    text-align: center;
    font-size: 1.6rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    letter-spacing: 0.1rem;
    background: #ffff00;
    color: ${({ theme: { colors }, $primary }) =>
      $primary ? colors.light : "#000"};
    padding: 0.6rem 2.5rem;
    cursor: pointer;
    font-weight: 400;
    border-radius: 1rem;
    border: 0.2rem solid #ffff00;
    outline: none;
  }
`;

export const NotificationNumber = styled.div`
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
`;

export const NotificationText = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.6rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    width: 25.7rem;
    color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;
    overflow-wrap: break-word;
    word-wrap: break-word; /* Para navegadores mais antigos */
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.8rem;
    width: 39.4rem;
  }
`;
