import styled from "styled-components";
import { AppearanceNavBottomProps } from "../../types";

export const NavBottom = styled.nav`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    grid-area: navbottom;
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    background-color: ${({ theme: { colors } }) => colors.primary};
    border-radius: 15px;
  }
`;

export const NavBottomIconContainer = styled.div<AppearanceNavBottomProps>`
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
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
  @media (max-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: center;
    gap: 4rem;
  }
`;
