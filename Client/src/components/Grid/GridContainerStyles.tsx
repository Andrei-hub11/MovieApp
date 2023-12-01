import styled from "styled-components";
import { GridContainerProps } from "../../types";

export const MainContainer = styled.div<GridContainerProps>`
  display: grid;

  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    grid-template-areas: ${({ $templateAreas }) => $templateAreas};
  }
  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    grid-template-rows: auto 1fr 5rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    grid-template-rows: 18rem 1fr 10rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    grid-template-columns: 240px 1fr;
    grid-template-rows: 55px 1fr 50px;
    grid-template-areas:
      "sidebar headernav"
      "sidebar main"
      "sidebar main";
    height: 100vh;
  }
`;
