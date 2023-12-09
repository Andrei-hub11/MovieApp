import styled from "styled-components";
import { AppearanceProps } from "../../types";

export const IndicatorContainer = styled.div<AppearanceProps>`
  margin: 1.5rem 1.5rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 35rem;
  background: ${({ theme: { colors } }) => colors.primary};

  @media (min-width: ${(props) => props.theme.breakPoints.desktopUp}) {
    position: ${({ $isUnique }) => ($isUnique ? "" : "fixed")};
    margin: 0;
    display: ${({ $isUnique }) => ($isUnique ? "none" : "")};
  }
`;

export const SectionName = styled.p`
  font-size: 1.4rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme: { colors } }) => colors.light};
  letter-spacing: 0.1rem;
`;
