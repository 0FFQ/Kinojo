import { Link, Stack } from "@mui/material";
import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useMoviesQuery from "../../../hooks/useMoviesQuery";
import ErrorMessage from "../ui/ErrorMessage";
import MoviesSkeleton from "./MoviesSkeleton";

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilm,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  if (isLoading) return <MoviesSkeleton />;

  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (data) =>
    data.map((row) => (
      <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
        <BearSlideImage imageUrl={row.posterUrlPreview} />
      </RouterLink>
    ));

  const carouselArr = [
    {
      title: "Популярные фильмы",
      url: "/popular",
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: "Лучшие фильмы",
      url: "/best",
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: "Фильмы",
      url: "/films",
      data: serializeDataForCarousel(responseFilm.data.items),
    },
    {
      title: "Сериалы",
      url: "/serials",
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: "Мультфильмы",
      url: "/cartoons",
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];

  return (
    <>
      {carouselArr.map((carousel) => (
        <Stack key={carousel.title}>
          <Link
            sx={{ mt: 1, mb: 1, textDecoration: "none", color: "inherit" }}
            variant="h5"
            component={RouterLink}
            to={carousel.url}
          >
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={1}
            isEnableNavButton
            breakpoints={{
              768: {
                slidesPerView: 5,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
}
