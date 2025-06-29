import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useGetStaffByIdQuery } from "../../../services/kinopoiskApi";
import ErrorMessage from "../ui/ErrorMessage";

export default function ActorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="4rem" sx={{ color: "white" }} />
      </Box>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <img
            src={data.posterUrl}
            style={{ width: "100%" }}
            alt={data.nameRu}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Stack flexDirection="row">
            <Button
              sx={{
                color: "white",
              }}
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            ></Button>
            <Stack flexDirection="column">
              <Typography variant="h6">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography gutterBottom variant="h6">
            Об актере
          </Typography>

          {/*-------------------------------*/}

          <Grid container>
            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>Карьера</Typography>
            </Grid>
            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            {/*-------------------------------*/}

            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>Рост</Typography>
            </Grid>
            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>{data.growth}</Typography>
            </Grid>

            {/*-------------------------------*/}

            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>Дата рождения</Typography>
            </Grid>
            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>
                {data.birthday} ({data.age} лет)
              </Typography>
            </Grid>

            {/*-------------------------------*/}

            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>Всего фильмов</Typography>
            </Grid>
            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid>

            {/*-------------------------------*/}

            <Grid item size={{ xs: 6 }}>
              <Typography gutterBottom>Факты</Typography>
            </Grid>
            <Grid item size={{ xs: 12 }}>
              {data.facts.map((fact, index) => (
                <Typography gutterBottom key={fact}>
                  {index + 1}. {fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Фильмы</Typography>
        </Grid>
      </Grid>
      <Stack spacing={0.5}>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex((el) => el.filmId === item.filmId),
          )
          .map((film, index) => (
            <Stack
              key={film.filmId}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>{index + 1}</Typography>
              <Link
                underline="none"
                color="white"
                component={RouterLink}
                to={`/movie/${film.filmId}`}
              >
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
