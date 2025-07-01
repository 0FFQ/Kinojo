import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../../../features/searchQuerySlice";
import { useGetFilmsQuery } from "../../../../services/kinopoiskApi";
import CustomScrollAutocomplete from "../Scroll/CustomScrollAutocomplete"; // импорт кастомного autocomplete

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
  const [open, setOpen] = useState(false);

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

  const filteredOptions =
    input.length > 0 && data?.items
      ? data.items.filter((item) =>
          item.nameRu.toLowerCase().includes(input.toLowerCase()),
        )
      : [];

  const isOpen = open && !isFetching && filteredOptions.length > 0;

  return (
    <CustomScrollAutocomplete
      freeSolo
      open={isOpen}
      onOpen={() => {
        if (input.length > 0) setOpen(true);
      }}
      onClose={() => setOpen(false)}
      sx={{
        width: { xs: "100%", sm: 300 },
        backgroundColor: "#1e1e1e",
        borderRadius: 1,
        mx: 2,
      }}
      getOptionLabel={(option) =>
        `${option.nameRu} (${movieTypes[option.type]}, ${option.year})`
      }
      options={filteredOptions}
      onInputChange={(_, value) => setInput(value)}
      onChange={(_, value) => {
        if (value) navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          InputLabelProps={{ style: { display: "none" } }}
          InputProps={{
            ...params.InputProps,
            sx: {
              height: 48,
              minHeight: 36,
              padding: 0,
              color: "white",
              display: "flex",
              alignItems: "center",
            },
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 0.5 }}>
                <SearchIcon sx={{ color: "#bbb" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isFetching && (
                  <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                )}
                {params.InputProps?.endAdornment}
              </>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            style: {
              padding: "0 12px",
              height: 36,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              color: "white",
            },
          }}
        />
      )}
    />
  );
}
