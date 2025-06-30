import { ArrowBack, Language } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as ReactRouter, useNavigate, useParams } from "react-router-dom";
import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskApi";
import ErrorMessage from "../ui/ErrorMessage";
import MovieCard from "../ui/MovieCard/MovieCard";
import VideoPlayer from "../ui/VideoPlayer";

export default function MovieDetail() {
  const { id } = useParams();
  const responsefilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);
  const navigate = useNavigate();

  if (
    responsefilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress color="white" size="4rem" />
      </Box>
    );
  }

  if (responsefilm.error || responseStaff.error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={{ xs: 1, md: 2 }} mt={0.5}>
        <Grid size={{ sm: 12, md: 4 }}>
          <img
            src={responsefilm.data.posterUrl}
            alt={responsefilm.data.nameRu}
            width="100%"
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <Grid container>
            <Grid size={2}>
              <Button
                startIcon={<ArrowBack />}
                color="black"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid size={10}>
              <Typography gutterBottom variant="h5">
                {responsefilm.data.nameRu}
              </Typography>
            </Grid>
          </Grid>
          <Box mb={1}>
            <Grid container>
              <Grid size={6}>
                <Typography>Год</Typography>
              </Grid>
              <Grid size={6}>
                <Typography>{responsefilm.data.year}</Typography>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
          <Box mb={1}>
            <Grid container>
              <Grid size={6}>
                <Typography>Страна</Typography>
              </Grid>
              <Grid size={6}>
                <Typography component="div">
                  {responsefilm.data.countries.map(({ country }) => (
                    <Typography key={country}>{country}</Typography>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
          <Box mb={1}>
            <Grid container>
              <Grid size={6}>
                <Typography>Жанры</Typography>
              </Grid>
              <Grid size={6}>
                <Typography component="div">
                  {responsefilm.data.genres.map(({ genre }) => (
                    <Typography key={genre}>{genre}</Typography>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
          <Box mb={1}>
            <Grid container>
              <Grid size={6}>
                <Typography>Режиссеры</Typography>
              </Grid>
              <Grid size={6}>
                <Typography component="div">
                  {responseStaff.data
                    .filter((el) => el.professionText === "Режиссеры")
                    .map(({ nameRu }) => (
                      <Typography key={nameRu}>{nameRu}</Typography>
                    ))}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
          <Box mb={1}>
            <Grid container>
              <Grid size={6}>
                <Typography>Время</Typography>
              </Grid>
              <Grid size={6}>
                <Typography>{responsefilm.data.filmLength} мин.</Typography>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
          <Box mb={1}>
            <Grid container>
              <Grid size={12}>
                <Typography gutterBottom>Описание</Typography>
              </Grid>
              <Grid size={12}>
                <Typography>
                  {responsefilm.data.description
                    ? responsefilm.data.description
                    : "Описание отсутствует"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
          <Box>
            <Grid container spacing={2}>
              <Grid size={12}>
                <ButtonGroup variant="outlined" size="small">
                  <Button
                    target="_blank"
                    href={responsefilm.data.webUrl}
                    sx={{
                      lineHeight: "1.7",
                      color: "#ccc",
                      borderColor: "#999",
                      "&:hover": {
                        borderColor: "#999",
                        backgroundColor: "rgba(135, 118, 118, 0.1)",
                      },
                    }}
                  >
                    Кинопоиск
                  </Button>
                  <Button
                    target="_blank"
                    href={`https://www.imdb.com/title/${responsefilm.data.imdbId}`}
                    sx={{
                      lineHeight: "1.7",
                      color: "#ccc",
                      borderColor: "#999",
                      "&:hover": {
                        borderColor: "#999",
                        backgroundColor: "rgba(135, 118, 118, 0.1)",
                      },
                    }}
                  >
                    IMDB
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------- */}
        </Grid>
        <Grid size={{ sm: 12, md: 2 }}>
          <Typography variant="h6">В главных ролях</Typography>
          {responseStaff.data
            .filter((el) => el.professionText === "Актеры")
            .slice(0, 6)
            .map(({ nameRu, staffId }) => (
              <div key={nameRu}>
                <Link
                  underline="none"
                  color="white"
                  component={ReactRouter}
                  to={`/actor/${staffId}`}
                >
                  {nameRu}
                </Link>
              </div>
            ))}
        </Grid>
      </Grid>
      {/* -------------------- */}
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        <Grid size={12}>
          <Typography variant="h5">Смотреть онлайн</Typography>
        </Grid>
        <VideoPlayer />
      </Grid>
      {/* -------------------- */}
      <Stack alignItems="center">
        <Typography variant="h5">
          {responseSequelsAndPrequels?.data?.length > 0
            ? "Сиквелы и приквелы"
            : "Нет сиквелов и приквелов"}
        </Typography>

        {responseSequelsAndPrequels?.data?.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {responseSequelsAndPrequels.data.map((el) => (
              <MovieCard key={el.kinopoiskId} movie={el} />
            ))}
          </Stack>
        )}
      </Stack>
    </>
  );
}
