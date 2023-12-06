import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BtnList, IconProps, InputsProps, SliderSettings } from "../../types";

import {
  BtnsContainer,
  CarouselImage,
  CarouselItem,
  CategoryContainer,
  CategoryContainerTitle,
  CentralSection,
  Container,
  FlexContainer,
  Information,
  InnerSliderContainer,
  MoveListContainer,
  MovieContainer,
  MovieImage,
  NavInputContainer,
  PostersCarousel,
  PostersCarouselInner,
  PostersContainer,
  PostersContainerTitle,
  SliderBtn,
  SliderContainer,
  SliderImg,
} from "./MainStyles";
import { IconContainer } from "../../components/Navbar/NavbarStyles";
import Icon from "../../components/Icon/Icon";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import SearchIcon from "../../assets/ic_round-search.svg";
import { images, movies, moviesComingSoon } from "../../constants/constants";

function Main() {
  const [width, setWidth] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <></>, // Define como um componente vazio para desativar o controle anterior
    nextArrow: <></>,
  };

  const icon: IconProps = {
    $primary: true,
    src: SearchIcon,
    alt: "search-icon",
    onClick: undefined,
  };

  const inputProps: InputsProps = {
    placeholder: "Pesquise um filme",
    onChange: undefined,
  };

  const btnlist: BtnList[] = [
    {
      btn: { $primary: true, onClick: undefined },
      btn_text: "Ação",
    },
    {
      btn: { $primary: false, onClick: undefined },
      btn_text: "Ficção",
    },
    {
      btn: { $primary: false, onClick: undefined },
      btn_text: "Aventura",
    },
  ];

  return (
    <CentralSection>
      <Container>
        <NavInputContainer>
          <Input input={inputProps}></Input>
          <IconContainer $primary>
            <Icon icon={icon} />
          </IconContainer>
        </NavInputContainer>
        <CategoryContainer>
          <CategoryContainerTitle>
            <p>Categorias</p>
          </CategoryContainerTitle>
          <BtnsContainer>
            {btnlist.map((btn) => (
              <Button key={btn.btn_text} btn={btn.btn}>
                {btn.btn_text}
              </Button>
            ))}
          </BtnsContainer>
        </CategoryContainer>

        <PostersContainer>
          <PostersContainerTitle>
            <p>Em cartaz</p>
          </PostersContainerTitle>
          <PostersCarousel ref={carousel}>
            <PostersCarouselInner
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {images.map((image) => (
                <CarouselItem key={image}>
                  <CarouselImage src={image} alt="imagem de filme" />
                </CarouselItem>
              ))}
            </PostersCarouselInner>
          </PostersCarousel>
        </PostersContainer>

        <PostersContainer>
          <PostersContainerTitle>
            <p>Em breve</p>
          </PostersContainerTitle>
          <PostersCarousel ref={carousel}>
            <PostersCarouselInner
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {moviesComingSoon.map((image) => (
                <CarouselItem key={image}>
                  <CarouselImage src={image} alt="imagem de filme" />
                </CarouselItem>
              ))}
            </PostersCarouselInner>
          </PostersCarousel>
        </PostersContainer>

        <FlexContainer>
          <Slider {...settings}>
            {movies.map((movie) => (
              <SliderContainer key={movie.altText}>
                <SliderImg src={movie.imageSrc} alt={movie.altText} />
                <InnerSliderContainer>
                  <Information $primary={movie.$primary}>
                    {movie.status}
                  </Information>
                  <SliderBtn role="botão">{movie.buttonText}</SliderBtn>
                </InnerSliderContainer>
              </SliderContainer>
            ))}
          </Slider>
        </FlexContainer>
      </Container>
      <MoveListContainer>
        {images.map((movie) => (
          <MovieContainer key={movie}>
            <MovieImage src={movie} />
          </MovieContainer>
        ))}
      </MoveListContainer>
    </CentralSection>
  );
}

export default Main;
