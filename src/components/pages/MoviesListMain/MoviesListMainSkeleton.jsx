import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import React from "react";

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rounded"
        height={"32px"}
        width={"245px"}
        sx={{ mt: 0.5, mb: 1, ml: 2.5 }}
      />
      <Stack
        mt={0.1}
        mb={1}
        sx={{
          gap: "3px",
          alignItems: "center",
          flexDirection: { sm: "column", md: "row" },
        }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height={40}
        />
        <Skeleton animation="wave" variant="rounded" width={132} height={40} />
      </Stack>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <React.Fragment key={index}>
              <Stack>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={"322px"}
                  width={"215px"}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="160px"
                    height="40px"
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="120px"
                    height="35px"
                  />
                </Box>
              </Stack>
            </React.Fragment>
          ))}
      </Stack>
    </>
  );
}
