import { ArrowBack } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MOVIE_LISTS } from "../../../constants";
import {
  useGetFilmsQuery,
  useGetGentesAndCountiesQuery,
} from "../../../services/kinopoiskApi";
import ErrorMessage from "../ui/ErrorMessage";
import MoviesList from "../ui/MoviesList/MoviesList";
import SelectMovies from "../ui/SelectMovies";
import MoviesListMainSkeleton from "./MoviesListMainSkeleton";

export default function MoviesListMain() {
  const location = useLocation();
  const { countries, genreId, order, year } = useSelector(
    (state) => state.currentQuery,
  );
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find((el) => el.url === location.pathname);

  const myGenreId = movieType.url === "/cartoons" ? 18 : genreId;

  const responseFilms = useGetFilmsQuery({
    type: movieType.value,
    countries,
    genreId: myGenreId,
    order,
    year,
    page,
  });

  const responseGenresAndCountries = useGetGentesAndCountiesQuery();

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error || responseGenresAndCountries.error)
    return <ErrorMessage />;

  if (responseFilms.isLoading || responseGenresAndCountries.isLoading)
    return <MoviesListMainSkeleton />;

  return (
    <>
      <Stack flexDirection="row" sx={{ mx: 2, mb: 1 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h5">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={responseGenresAndCountries.data.countries}
        genresList={responseGenresAndCountries.data.genres}
        genreId={genreId}
        order={order}
        year={year}
        countries={countries}
      />
      <MoviesList
        movies={responseFilms.data.items}
        totalPages={responseFilms.data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
