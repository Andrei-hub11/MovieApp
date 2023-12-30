import styled from "styled-components";
import { AppearanceGroupProps, AppearanceProps } from "../../types";

export const PaymentContainer = styled.main`
  grid-area: main;
`;

export const IconContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin: 1.5rem 1.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const InformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    width: 52rem;
    height: 62rem;
    margin: 0 auto;
    border-radius: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    width: 50rem;
    height: 65rem;
  }
`;

export const Divider = styled.hr`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    //inicial de 290px (29rem)
    width: 70%;
    height: 1px;
    background: ${({ theme: { colors } }) => colors.primary};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 69.6%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    width: 46rem;
  }
`;

export const InnerInformationContainer = styled.div<AppearanceGroupProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: ${({ $hasMargin }) => ($hasMargin ? $hasMargin : "")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    //inicial de 374px (37.4rem)
    width: 90.3%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    width: 48rem;
  }
`;

export const BtnContainer = styled(InnerInformationContainer)`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    justify-content: center;
    width: 24.2rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 35rem;
  }
`;

export const InformationText = styled.p<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: ${({ $primary }) => ($primary ? "2rem" : "1.4rem")};
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    color: ${({ theme: { colors }, $hasColor }) =>
      $hasColor ? colors.tertiary : colors.text};
    letter-spacing: 0.1rem;
    text-transform: ${({ $isUnique }) => ($isUnique ? "uppercase" : "")};
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: ${({ $primary }) => ($primary ? "2rem" : "1.6rem")};
  }
`;

export const SeatsInformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SeatsCarousel = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    gap: 2.5rem;
    text-transform: uppercase;
  }
`;

export const Seats = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    padding: 0.2rem 1.5rem;
    background: ${({ theme: { colors } }) => colors.primary};
    color: ${({ theme: { colors } }) => colors.light};
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-size: 1.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    padding: 0.4rem 1.8rem;
  }
`;

export const PaymentSettingsContainer = styled.div<AppearanceGroupProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: ${({ $hasMargin }) => ($hasMargin ? $hasMargin : "")};
    display: flex;
    gap: 1.8rem;
    flex-direction: column;
    padding: 1rem 2rem;
    width: 36rem;
    background: ${({ theme: { colors } }) => colors.text};
    border-radius: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 52rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    width: 48.2rem;
  }
`;

export const RadioContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 32.6rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 34rem;
  }
`;

export const InnerRadioContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const RadioInput = styled.input<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* utilizando um estilo personalizado */
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid #000;
    outline: none;
    cursor: pointer;
    &:checked {
      background: ${({ $isSelected, theme: { colors } }) =>
        $isSelected ? colors.primary : ""};
    }
  }
`;

export const PaymentText = styled.p<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    color: ${({ theme: { colors } }) => colors.bg};
    letter-spacing: 0.1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
  }
`;

export const FormControl = styled.div<AppearanceGroupProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    margin-top: ${({ $hasMargin }) => ($hasMargin ? $hasMargin : "")};
    padding: 1rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

export const FormInput = styled.input<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    position: relative;
    font-size: 1.5rem;
    font-weight: 400;
    width: 30rem;
    height: 3.5rem;
    border: ${({ $isValid, theme: { colors } }) =>
      $isValid
        ? `.2rem solid ${colors.primary}`
        : $isValid === false
        ? "0.2rem solid #ff0000"
        : `.2rem solid ${colors.primary}`};
    border-radius: 0.5rem;
    outline: 0;
    background-color: ${({ theme: { colors } }) => colors.bg};
    color: ${({ theme: { colors } }) => colors.text};
    padding-left: 1rem;
    letter-spacing: 0.1rem;
    caret-color: #3366ff;

    &::placeholder {
      color: #fff;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 5rem white inset;
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
    width: 36rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    background: ${({ theme: { colors } }) => colors.secondary_bg};
  }
`;

export const LabelForm = styled.label`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    top: 0.3rem;
    left: 1rem;
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-size: 1.2rem;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.text};
    position: absolute;
    transition: 0.2s;
    padding: 0 0.6rem;
    height: 1rem;
    background: ${({ theme: { colors } }) => colors.bg};
    pointer-events: none;
    letter-spacing: 0.1rem;

    ${FormInput}:placeholder-shown + & {
      font-weight: 400;
      font-size: 1.4rem;
      cursor: text;
      top: 1.9rem;
      left: 1.8rem;
      color: ${({ theme: { colors } }) => colors.text};
      letter-spacing: 0.1rem;
    }

    ${FormInput}:focus + & {
      top: 0.3rem;
      left: 1rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: ${({ theme: { colors } }) => colors.text};
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.4rem;
    top: 0.2rem;

    ${FormInput}:placeholder-shown + & {
      font-size: 1.6rem;
    }

    ${FormInput}:focus + & {
      font-size: 1.4rem;
      top: 0.2rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    background: ${({ theme: { colors } }) => colors.secondary_bg};
  }
`;

export const FormMsg = styled.small<AppearanceProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: ${({ $isValid }) =>
      $isValid == true ? "none" : $isValid === "" ? "none" : "flex"};
    position: absolute;
    font-size: 1.2rem;
    font-weight: 700;
    color: #ff0000;
    bottom: -0.8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    font-size: 1.4rem;
  }
`;

export const PaymentBtn = styled.a<AppearanceProps>`
  text-align: center;
  font-size: 1.6rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  letter-spacing: 0.1rem;
  background: ${({ theme: { colors }, $primary }) =>
    $primary ? colors.primary_btn : colors.secondary_btn};
  color: ${({ theme: { colors }, $primary }) =>
    $primary ? colors.light : "#000"};
  padding: 0.6rem 2.5rem;
  cursor: pointer;
  font-weight: 400;
  border-radius: 1rem;
  border: ${({ theme: { colors }, $primary }) =>
    $primary
      ? `.2rem solid ${colors.primary_btn}`
      : `.2rem solid ${colors.primary_btn}`};
  outline: none;
  flex: ${({ $isUnique }) => ($isUnique ? "1" : "")};

  &:hover {
    background: ${({ theme: { colors }, $primary }) =>
      $primary ? "#fff" : colors.primary_btn};
    border: ${({ theme: { colors }, $primary }) =>
      $primary ? `.2rem solid ${colors.primary_btn}` : ""};
    color: ${({ theme: { colors }, $primary }) =>
      $primary ? "#000" : colors.secondary_btn};
    transition: 0.3s ease-out;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    font-size: 1.6rem;
    padding: 0.4rem 1.8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    font-size: 1.8rem;
    padding: 0.4rem 2rem;

    &:hover {
      background: ${({ theme: { colors }, $primary }) =>
        $primary ? colors.secondary_bg : "#000"};
      border: ${({ theme: { colors }, $primary }) =>
        $primary ? `.2rem solid ${colors.primary_btn}` : ""};
      color: ${({ theme: { colors }, $primary }) =>
        $primary ? colors.secondary_btn : colors.secondary_btn};
      transition: 0.3s ease-out;
    }
  }
`;
