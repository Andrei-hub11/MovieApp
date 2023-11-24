import styled from "styled-components";

export const CustomInput = styled.input`
  width: 33.2rem;
  height: 3.4rem;
  border: 0.2rem solid #fff;
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
