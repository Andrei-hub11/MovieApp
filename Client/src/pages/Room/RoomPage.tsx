import { useState, useEffect, useRef } from "react";
import {
  ArrowIcon,
  CarouselItemContainer,
  Container,
  DateCarousel,
  DateCarouselInner,
  DateContainer,
  GroupContainer,
  GroupInner,
  HourItem,
  HoursContainer,
  Information,
  InformationBall,
  InformationContainer,
  InnerInformationContainer,
  Item,
  MovieImage,
  MovieSubtitle,
  MovieTitle,
  MovieTitleContainer,
  PriceInformation,
  RoomContainer,
  RoomImageContainer,
  RoomNav,
  SeatsContainer,
  SeatsItems,
  RoomBtn,
} from "./RoomPageStyles";
import { data, dateList, hoursList } from "../../constants/constants";

import Avatar from "../../assets/avatar-t.jpg";
import icon from "../../assets/mdi_love-seat.svg";
import arrowIcon from "../../assets/solar_arrow-left-linear.svg";
import useRedirect from "../../utils/customHook/useRedirect/useRedirect";

function RoomPage() {
  const { redirectTo } = useRedirect();
  const [width, setWidth] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <RoomContainer>
      <RoomImageContainer>
        <ArrowIcon
          src={arrowIcon}
          onClick={() => {
            redirectTo("/home");
          }}
        />
        <MovieImage src={Avatar} alt="imagem do filme" />
      </RoomImageContainer>

      <MovieTitleContainer>
        <MovieTitle>Avatar</MovieTitle>
        <MovieSubtitle>O Caminho da Água</MovieSubtitle>
      </MovieTitleContainer>

      <InformationContainer>
        <InnerInformationContainer>
          <Information>Disponíveis</Information>
          <InformationBall></InformationBall>
        </InnerInformationContainer>
        <InnerInformationContainer>
          <Information>Reservadas</Information>
          <InformationBall $hasColor={"#309D1D"}></InformationBall>
        </InnerInformationContainer>
        <InnerInformationContainer>
          <Information>Selecionadas</Information>
          <InformationBall $hasColor={"#3CC2EA"}></InformationBall>
        </InnerInformationContainer>
      </InformationContainer>

      <Container>
        <SeatsContainer>
          {data.map((group) => (
            <GroupContainer
              key={group.group}
              $hasMargin={group.group == 2 || group.group == 4 ? "1rem" : ""}
            >
              <GroupInner>
                {group.items.map((item) => (
                  <SeatsItems
                    key={item.id}
                    $hasMargin={item.gap ? item.gap : ""}
                  >
                    <img src={icon} alt="" />
                  </SeatsItems>
                ))}
              </GroupInner>
            </GroupContainer>
          ))}
        </SeatsContainer>
      </Container>

      <DateContainer>
        <DateCarousel ref={carousel}>
          <DateCarouselInner
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {dateList.map((date) => (
              <CarouselItemContainer key={date.date}>
                <Item>{date.day}</Item>
                <Item>{date.date}</Item>
              </CarouselItemContainer>
            ))}
          </DateCarouselInner>
        </DateCarousel>
      </DateContainer>
      <HoursContainer>
        {hoursList.map((hour) => (
          <HourItem key={hour}>{hour}</HourItem>
        ))}
      </HoursContainer>

      <RoomNav>
        <PriceInformation>R$ 70</PriceInformation>
        <RoomBtn
          $primary={true}
          onClick={() => {
            redirectTo("/pagamento");
          }}
        >
          Continuar
        </RoomBtn>
      </RoomNav>
    </RoomContainer>
  );
}

export default RoomPage;
