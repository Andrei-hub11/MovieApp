import styled from "styled-components";

export const IndicatorContainer = styled.div`
  margin: 1.5rem 1.5rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 35rem;
  background: ${({ theme: { colors } }) => colors.primary};
`;

export const SectionName = styled.p`
  font-size: 1.4rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme: { colors } }) => colors.light};
  letter-spacing: 0.1rem;
`;
