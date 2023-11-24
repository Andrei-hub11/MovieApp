import styled from "styled-components";

export const ProfileContainer = styled.main`
  grid-area: main;
`;

export const ProfileInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  padding: 1rem 0;
  width: 100%;
  align-items: center;
  background: ${({ theme: { colors } }) => colors.secondary_bg};
`;

export const ContainerInner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  min-width: 34rem;
  gap: 3rem;
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  height: 9.4rem;
  width: 9.4rem;
  border-radius: 50%;
`;
/* 
export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  p {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;
  }
`; */

export const ProfileText = styled.p`
  font-size: 1.4rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme: { colors } }) => colors.text};
  letter-spacing: 0.1rem;
`;
