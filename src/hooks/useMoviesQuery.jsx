import { useSelector } from "react-redux";
import { TOP_LISTS } from "../constants";
import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
} from "../services/kinopoiskApi";

export default function useMoviesQuery() {
  const { countries, genreId, order, type, year, page } = useSelector(
    (state) => state.currentQuery || {},
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilm = useGetFilmsQuery({
    type: "FILM",
    countries,
    genreId: "1",
    order,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    type: "TV_SERIES",
    countries,
    genreId: "1",
    order,
    year,
    page,
  });
  const responseCartoons = useGetFilmsQuery({
    type: "FILM",
    countries,
    genreId: "18",
    order,
    year,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseFilm.isFetching ||
    responseSerials.isFetching ||
    responseCartoons.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilm.error ||
    responseSerials.error ||
    responseCartoons.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilm,
    responseSerials,
    responseCartoons,
  };
}
