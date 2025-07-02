import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  resetQuery,
  selectQuery,
} from "../../../../features/currentQuerySlice";

export default function SelectMovies({
  countriesList,
  genresList,
  genreId,
  order,
  year,
  countries,
}) {
  const dispatch = useDispatch();

  const ordersList = [
    { title: "По рейтингу", value: "RATING" },
    { title: "По оценкам", value: "NUM_VOTE" },
  ];

  // Отсортированные списки стран и жанров
  const sortedCountries = [...countriesList].sort((a, b) =>
    a.country.localeCompare(b.country),
  );

  const sortedGenres = [...genresList].sort((a, b) =>
    a.genre.localeCompare(b.genre),
  );

  // Список годов
  const yearsList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  return (
    <Stack
      mt={0.1}
      mb={1}
      sx={{
        gap: "3px",
        alignItems: "center",
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      {/* Сортировка по рейтингу — оставляем Select */}
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={order}
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
          label="Сортировка"
        >
          {ordersList.map((order) => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Страны с поиском */}
      <Autocomplete
        size="small"
        options={sortedCountries}
        getOptionLabel={(option) => option.country}
        value={sortedCountries.find((c) => c.id === countries) || null}
        onChange={(event, newValue) => {
          dispatch(selectQuery({ countries: newValue ? newValue.id : "" }));
        }}
        renderInput={(params) => <TextField {...params} label="Страна" />}
        sx={{ width: "100%" }}
      />

      {/* Жанры с поиском */}
      <Autocomplete
        size="small"
        options={sortedGenres}
        getOptionLabel={(option) => option.genre}
        value={sortedGenres.find((g) => g.id === genreId) || null}
        onChange={(event, newValue) => {
          dispatch(selectQuery({ genreId: newValue ? newValue.id : "" }));
        }}
        renderInput={(params) => <TextField {...params} label="Жанр" />}
        sx={{ width: "100%" }}
      />

      {/* Года с поиском */}
      <Autocomplete
        size="small"
        options={yearsList}
        getOptionLabel={(option) => option.title.toString()}
        value={yearsList.find((y) => y.value === year) || null}
        onChange={(event, newValue) => {
          dispatch(selectQuery({ year: newValue ? newValue.value : "" }));
        }}
        renderInput={(params) => <TextField {...params} label="Год" />}
        sx={{ width: "100%" }}
      />

      {/* Кнопка сброса */}
      <Box>
        <Button
          onClick={() => dispatch(resetQuery())}
          variant="outlined"
          startIcon={<CloseIcon />}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(117, 115, 115, 0.7)",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 1)",
              backgroundColor: "transparent",
              color: "rgba(255, 255, 255, 0.7)",
            },
          }}
        >
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}
