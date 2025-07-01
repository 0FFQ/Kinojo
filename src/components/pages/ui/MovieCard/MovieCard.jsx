import MovieCreationIcon from "@mui/icons-material/MovieCreation"; // для кинокомпаний
import PeopleIcon from "@mui/icons-material/People"; // для зрителей
import { Box, Link, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./MovieCard.module.css";

export default function MovieCard({ movie }) {
  return (
    <Stack>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <RouterLink to={`/movie/${movie.kinopoiskId}`}>
          <img
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
            className={styles.img}
          />
        </RouterLink>

        {/* Рейтинг зрителей (зелёный с иконкой людей) */}
        {movie.ratingKinopoisk !== null &&
          movie.ratingKinopoisk !== undefined && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.7)", // тёмный фон с прозрачностью
                color: "white", // цифры белые
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
              title={`Рейтинг зрителей: ${movie.ratingKinopoisk} / 10`}
            >
              <PeopleIcon sx={{ fontSize: 16, color: "#4caf50" }} />
              <span>{movie.ratingKinopoisk.toFixed(1)}</span>
            </Box>
          )}

        {/* Рейтинг кинокомпаний (если есть) */}
        {movie.ratingFilmCritics !== null &&
          movie.ratingFilmCritics !== undefined && (
            <Box
              sx={{
                position: "absolute",
                top: 36, // чуть ниже первого рейтинга
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.7)", // тёмный фон с прозрачностью
                color: "white", // цифры белые
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
              title={`Рейтинг кинокомпаний: ${movie.ratingFilmCritics} / 10`}
            >
              <MovieCreationIcon sx={{ fontSize: 16, color: "#fff" }} />
              <span>{movie.ratingFilmCritics.toFixed(1)}</span>
            </Box>
          )}
      </Box>

      <Link
        component={RouterLink}
        to={`/movie/${movie.kinopoiskId}`}
        textAlign="center"
        sx={{
          width: "200px",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {movie.nameRu ? movie.nameRu : movie.nameEn}
      </Link>
    </Stack>
  );
}
