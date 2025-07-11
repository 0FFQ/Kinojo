import { Box, Link, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function MovieCard({ movie, reload = false }) {
  const title = movie.nameRu ?? movie.nameEn ?? "";

  const displayTitle = title.length > 18 ? title.slice(0, 18) + "…" : title;
  const linkProps = reload
    ? { component: "a", href: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };
  return (
    <Stack
      sx={{
        margin: "5px", // отступ вокруг карточки
      }}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Link {...linkProps}>
          <img
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
            style={{
              width: 200,
              height: 300,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Link>

        {typeof movie.ratingKinopoisk === "number" && (
          <Box
            title={`Рейтинг зрителей: ${movie.ratingKinopoisk.toFixed(1)} / 10`}
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
          >
            <span>{movie.ratingKinopoisk.toFixed(1)}</span>
          </Box>
        )}
      </Box>

      <Link
        component="p"
        textAlign="center"
        sx={{
          width: "200px",
          textDecoration: "none",
          color: "inherit",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          mb: 0.2,
          mt: 0.2, // отступ сверху, снизу
          display: "block",
        }}
      >
        {displayTitle}
      </Link>
    </Stack>
  );
}
