import styled from "styled-components";
import { GridContainerProps } from "../../types";

export const MainContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 55px 1fr 50px;
  grid-template-areas:
    "sidebar headernav"
    "sidebar main"
    "sidebar main";
  height: 100vh;

  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    grid-template-areas: ${({ $templateAreas }) => $templateAreas};
  }
`;
