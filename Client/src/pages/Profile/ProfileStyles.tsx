import styled from "styled-components";

export const ProfileContainer = styled.main`
  grid-area: main;
`;

export const ProfileInformationContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    padding: 1rem 0;
    width: 100%;
    align-items: center;
    background: ${({ theme: { colors } }) => colors.secondary_bg};
    border-radius: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletPortraitUp}) {
    margin: 13rem auto;
    max-width: 60rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    max-width: 63.8rem;
    padding: 3rem 0;
  }
`;

export const ContainerInner = styled.div`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    min-width: 34rem;
    gap: 3rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 46rem;
  }
`;

export const ProfileImage = styled.img`
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    object-fit: cover;
    height: 9.4rem;
    width: 9.4rem;
    border-radius: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.phoneOnly}) {
    width: 11.2rem;
    height: 10.8rem;
  }

  @media (min-width: ${(props) => props.theme.breakPoints.tabletLandscapeUp}) {
    width: 12.5rem;
    height: 12.1rem;
  }
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
  @media (min-width: ${(props) => props.theme.breakPoints.smallerPhone}) {
    font-size: 1.4rem;
    font-family: ${({ theme: { fonts } }) => fonts[1]};
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.text};
    letter-spacing: 0.1rem;
  }
`;
