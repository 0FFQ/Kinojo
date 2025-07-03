import { ArrowBack } from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
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
  const apiKey = import.meta.env.VITE_KINOPOISK_KEY;
  const { id } = useParams();
  const responsefilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);
  const navigate = useNavigate();

  const [fullSequels, setFullSequels] = useState([]);

  useEffect(() => {
    async function fetchFullSequels() {
      if (responseSequelsAndPrequels.data?.length) {
        const promises = responseSequelsAndPrequels.data.map(async (item) => {
          try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${item.kinopoiskId}`, {
              headers: {
                "X-API-KEY": apiKey,
                "Content-Type": "application/json",
              },
            });
    
            if (!res.ok) return item;
    
            const data = await res.json();
    
            return {
              kinopoiskId: item.kinopoiskId,
              nameRu: item.nameRu,
              posterUrl: data.posterUrl,
              posterUrlPreview: data.posterUrlPreview,
              ratingKinopoisk: data.ratingKinopoisk ?? null,
            };
          } catch (e) {
            return item;
          }
        });
    
        const results = await Promise.all(promises);
        setFullSequels(results);
      }
    }
    fetchFullSequels();
  }, [responseSequelsAndPrequels.data]);

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
  console.log("Сиквелы и приквелы:", responseSequelsAndPrequels.data);

  const sequelsToShow = fullSequels.length ? fullSequels : responseSequelsAndPrequels.data;

  return (
    <>
      <Grid container spacing={{ xs: 1, md: 2 }} mt={2}>
        <Grid item xs={12} md={4}>
          <Box position="relative" width="100%">
            <img
              src={responsefilm.data.posterUrl}
              alt={responsefilm.data.nameRu}
              style={{
                width: "100%",
                maxWidth: 370,
                height: "auto",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                px: 1.5,
                py: 0.3,
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "14px",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minWidth: "40px",
                boxShadow: "0 0 6px rgba(0,0,0,0.7)",
              }}
              title={`Рейтинг зрителей: ${
                Number.isFinite(responsefilm.data.ratingKinopoisk)
                  ? responsefilm.data.ratingKinopoisk.toFixed(1)
                  : "нет данных"
              } / 10`}
            >
              <span>
                {Number.isFinite(responsefilm.data.ratingKinopoisk)
                  ? responsefilm.data.ratingKinopoisk.toFixed(1)
                  : "—"}
              </span>
            </Box>
          </Box>
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
          <Typography mt="20px" mb="25px" variant="h5">Смотреть онлайн</Typography>
        </Grid>
        <VideoPlayer />
      </Grid>
      {/* -------------------- */}
      <Stack alignItems="center">
        <Typography mb="20px" mt="25px" variant="h5">
          {sequelsToShow?.length > 0
            ? "Сиквелы и приквелы"
            : "Нет сиквелов и приквелов"}
        </Typography>

        {sequelsToShow?.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {sequelsToShow.map((el) => (
              <MovieCard key={el.kinopoiskId} movie={el} reload />
            ))}
          </Stack>
        )}
      </Stack>
    </>
  );
}
