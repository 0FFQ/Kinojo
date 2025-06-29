import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../../../features/searchQuerySlice";
import { useGetFilmsQuery } from "../../../../services/kinopoiskApi";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieTypes = {
    FILM: "Фильм",
    TV_SERIES: "Сериал",
    TV_SHOW: "ТВ-Шоу",
    MINI_SERIES: "Мини-сериал",
  };

  const { countries, genreId, order, type, year, keyword, page } = useSelector(
    (state) => state.searchQuerySlice,
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input]);

  const { data, isFetching } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword,
  });

  return (
    <Autocomplete
      freeSolo
      sx={{
        width: 300,
        backgroundColor: "#1e1e1e",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
      getOptionLabel={(option) =>
        `${option.nameRu} (${movieTypes[option.type]}, ${option.year})`
      }
      options={data ? data.items : []}
      onInputChange={(_, value) => {
        setInput(value);
      }}
      onChange={(_, value) => {
        navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск фильмов"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching && (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                )}
                {params.InputProps?.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
