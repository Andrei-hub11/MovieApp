import styled from "styled-components";

export const NotificationContainer = styled.div`
  grid-area: main;
`;

export const ContainerInner = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Notification = styled.div`
  padding: 2rem 3.65rem;
  width: 32rem;
  height: auto;
  background: ${({ theme: { colors } }) => colors.secondary_bg};
  border-radius: 1.5rem 1.5rem 1.5rem 0;
  overflow: hidden;
`;

export const NotificationText = styled.div`
  font-size: 1.6rem;
  font-family: ${({ theme: { fonts } }) => fonts[1]};
  font-weight: 500;
  width: 25.7rem;
  color: ${({ theme: { colors } }) => colors.text};
  letter-spacing: 0.1rem;
  overflow-wrap: break-word;
  word-wrap: break-word; /* Para navegadores mais antigos */
`;
