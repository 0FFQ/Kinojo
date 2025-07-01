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
              title={`Рейтинг зрителей: ${movie.ratingKinopoisk} / 10`}
            >
              <PeopleIcon sx={{ color: "#ffffff", fontSize: 16 }} />
              <span>{movie.ratingKinopoisk.toFixed(1)}</span>
            </Box>

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
