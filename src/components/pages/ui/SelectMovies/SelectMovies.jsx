import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { resetQuery, selectQuery } from "../../../../features/currentQuerySlice";

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
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={order}
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
        >
          {ordersList.map((order) => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select
          value={countries}
          onChange={(e) => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {countriesList.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          value={genreId}
          onChange={(e) => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {genresList.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select
          value={year}
          onChange={(e) => dispatch(selectQuery({ year: e.target.value }))}
        >
          {yearsList.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button onClick={() => dispatch(resetQuery())} variant="outlined" startIcon={<CloseIcon />}>
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}
