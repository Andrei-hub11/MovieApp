import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const Btn = styled.a<AppearanceProps>`
  text-align: center;
  font-size: 1.6rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  letter-spacing: 0.1rem;
  background: ${({ theme: { colors }, $primary }) =>
    $primary ? colors.primary_btn : colors.secondary_btn};
  color: ${({ theme: { colors }, $primary }) =>
    $primary ? colors.secondary_text : "#000"};
  padding: 0.6rem 2.5rem;
  cursor: pointer;
  font-weight: 400;
  border-radius: 1rem;
  border: ${({ theme: { colors }, $primary }) =>
    $primary
      ? `.2rem solid ${colors.primary_btn}`
      : `.2rem solid ${colors.primary_btn}`};
  outline: none;

  &:hover {
    background: ${({ theme: { colors }, $primary }) =>
      $primary ? "#fff" : colors.primary_btn};
    border: ${({ theme: { colors }, $primary }) =>
      $primary ? `.2rem solid ${colors.primary_btn}` : ""};
    color: ${({ theme: { colors }, $primary }) =>
      $primary ? "#000" : colors.secondary_btn};
    transition: 0.3s ease-out;
  }
`;
