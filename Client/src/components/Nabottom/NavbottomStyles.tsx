import styled from "styled-components";
import { AppearanceNavBottomProps } from "../../types";

export const NavBottom = styled.nav`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    grid-area: navbottom;
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    background: ${({ theme: { colors } }) => colors.primary};
    border-radius: 15px;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    padding: 1rem 6rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    padding: 1rem 9.1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    display: none;
  }
`;

export const NavBottomIconContainer = styled.div<AppearanceNavBottomProps>`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: ${({ theme: { colors }, $isSelected }) =>
      $isSelected ? colors.light : colors.primary};
    cursor: pointer;
  }
`;

export const NavIcons = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    gap: 4rem;
  }
`;
