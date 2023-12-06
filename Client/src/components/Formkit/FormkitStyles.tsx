import { motion } from "framer-motion";
import styled from "styled-components";

import { AppearanceProps } from "../../types";

import Loader from "../../assets/loader.svg";

export const Container = styled.section`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

export const FormContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    width: 26.6rem;
    height: 30.3rem;
  }
`;

export const FormTitle = styled.h1`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-family: ${({ theme: { fonts } }) => fonts[0]};
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.text};
  }
`;

export const Form = styled.form`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
    row-gap: 0.5rem;
  }
`;

export const FormControl = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    padding: 1rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

export const FormInput = styled.input`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: relative;
    font-size: 1.4rem;
    font-weight: 400;
    width: 26.6rem;
    height: 3.6rem;
    border-radius: 0.5rem;
    outline: 0;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    color: ${({ theme: { colors } }) => colors.text};
    padding-left: 1rem;
    caret-color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;

    &::placeholder {
      color: ${({ theme: { colors } }) => colors.text};
      letter-spacing: 0.1rem;
      font-weight: bold;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 5rem
        ${({ theme: { colors } }) => colors.secondary_bg} inset;
    }
  }
`;

export const FormMsg = styled.small<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: ${({ $isUnique }) => ($isUnique ? "flex" : "none")};
    position: absolute;
    font-size: 1.2rem;
    font-weight: 700;
    color: #ff0000;
    bottom: -0.8rem;
  }
`;

export const FormIcon = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    cursor: pointer;
  }
`;

export const CheckboxContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    align-items: center;
    width: 100%;
    margin-right: auto;
    gap: 1.2rem;
  }
`;

export const CheckboxText = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-family: ${({ theme: { fonts } }) => fonts[0]};
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme: { colors } }) => colors.text};
  }
`;

export const AccountBtn = styled.a<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 1.6rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    letter-spacing: 0.1rem;
    background: ${({ theme: { colors } }) => colors.primary_btn};
    color: ${({ theme: { colors } }) => colors.light};
    padding: 0.8rem 2.5rem;
    cursor: pointer;
    font-weight: bold;
    border-radius: 2rem;
    border: ${({ theme: { colors } }) => `solid .2rem ${colors.primary}`};
    outline: none;
    width: 26rem;

    &:hover {
      background: ${({ theme: { colors } }) => colors.bg};
      color: ${({ theme: { colors } }) => colors.text};
      transition: background 0.5s;
    }

    ${(props) =>
      props.disabled &&
      `
    opacity: 0.6; 
  `}
  }
`;

export const InformationText = styled.p`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-family: ${({ theme: { fonts } }) => fonts[0]};
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme: { colors } }) => colors.text};

    a {
      color: ${({ theme: { colors } }) => colors.primary};
      cursor: pointer;
    }
  }
`;

export const LoaderContainer = styled(motion.div)``;

export const StyledLoader = styled.img.attrs({
  src: Loader,
  alt: "Loader",
})``;
