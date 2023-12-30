import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

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
  InnerRoomContainer,
  PrimaryInformationContainer,
  MovieBackdropImage,
  PaymentContainer,
  PrimaryDateContainer,
  SeatIcon,
} from "./RoomPageStyles";
import PaymentPage from "../Payment/PaymentPage";

import icon from "../../assets/mdi_love-seat.svg";
import BlueSeat from "../../assets/mdi_love-seat-blue.svg";
import arrowIcon from "../../assets/solar_arrow-left-linear.svg";

import useRoom from "./useRoom";

function RoomPage() {
  const {
    isProcessing,
    RoomListMovieSelected,
    seatsGroup,
    redirectTo,
    setChosenDate,
    setChosenTime,
    subtotal,
    dateList,
    isSeatSelected,
    handleSelectedDate,
    handleSelectedTime,
    handleRedirectToPayment,
    hoursList,
    handleSelectedSeat,
  } = useRoom();

  const [width, setWidth] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  dayjs.locale("pt-br");

  return (
    <RoomContainer>
      <InnerRoomContainer>
        <PrimaryInformationContainer>
          <RoomImageContainer>
            <ArrowIcon
              src={arrowIcon}
              onClick={() => {
                redirectTo("/home");
              }}
            />
            <MovieImage
              src={
                import.meta.env.VITE_MOVIE_APP_API_URL +
                RoomListMovieSelected[0]?.MovieImagePath
              }
              alt="imagem do filme"
              loading="lazy"
            />
            <MovieBackdropImage
              src={
                import.meta.env.VITE_MOVIE_APP_API_URL +
                RoomListMovieSelected[0]?.MovieBackdropPath
              }
            />
          </RoomImageContainer>

          <MovieTitleContainer>
            <MovieTitle>
              {RoomListMovieSelected
                ? RoomListMovieSelected[0]?.MovieTitle
                : ""}
            </MovieTitle>
            <MovieSubtitle>
              {RoomListMovieSelected
                ? RoomListMovieSelected[0]?.MovieSubtitle
                : ""}
            </MovieSubtitle>
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
              {seatsGroup.map((group) => (
                <GroupContainer
                  key={group.group}
                  $hasMargin={
                    group.group == 2 || group.group == 4 ? "1rem" : ""
                  }
                >
                  <GroupInner>
                    {group.seats.map((seat) => (
                      <SeatsItems
                        key={seat.Id}
                        $hasMargin={seat.gap ? seat.gap : ""}
                      >
                        <SeatIcon
                          src={isSeatSelected[seat.Id] ? BlueSeat : icon}
                          alt="icone de cadeiras"
                          $isUnique={seat.IsReserved}
                          onClick={() => handleSelectedSeat(seat)}
                          disabled={seat.IsReserved}
                        />
                      </SeatsItems>
                    ))}
                  </GroupInner>
                </GroupContainer>
              ))}
            </SeatsContainer>
          </Container>

          <PrimaryDateContainer>
            <DateContainer>
              <DateCarousel ref={carousel}>
                <DateCarouselInner
                  drag="x"
                  dragConstraints={{ right: 0, left: -width }}
                >
                  {dateList?.map((date) => (
                    <CarouselItemContainer
                      key={date.Id}
                      $primary={handleSelectedDate(dayjs(date.EventDateTime))}
                      onClick={() => {
                        setChosenDate(
                          dayjs(date.EventDateTime).format("YYYY-MM-DD")
                        );
                      }}
                    >
                      <Item
                        $primary={handleSelectedDate(dayjs(date.EventDateTime))}
                      >
                        {dayjs(date.EventDateTime).format("ddd")}
                      </Item>
                      <Item
                        $primary={handleSelectedDate(dayjs(date.EventDateTime))}
                      >
                        {dayjs(date.EventDateTime).format("DD")}
                      </Item>
                    </CarouselItemContainer>
                  ))}
                </DateCarouselInner>
              </DateCarousel>
            </DateContainer>
          </PrimaryDateContainer>
          <HoursContainer>
            {hoursList.map((hour) => (
              <HourItem
                key={hour.Id}
                $primary={handleSelectedTime(dayjs(hour.EventDateTime))}
                onClick={() => {
                  setChosenTime(dayjs(hour.EventDateTime).format("HH:mm"));
                }}
              >
                {dayjs(hour.EventDateTime).format("HH:mm")}
              </HourItem>
            ))}
          </HoursContainer>
        </PrimaryInformationContainer>
        <RoomNav>
          <PriceInformation>{`R$ ${subtotal}`}</PriceInformation>
          <RoomBtn $primary={true} onClick={handleRedirectToPayment}>
            Continuar
          </RoomBtn>
        </RoomNav>
        {isProcessing ? (
          <PaymentContainer>
            <PaymentPage />
          </PaymentContainer>
        ) : null}
      </InnerRoomContainer>
    </RoomContainer>
  );
}

export default RoomPage;
