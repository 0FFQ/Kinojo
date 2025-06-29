import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function MoviesListTopSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rounded"
        height={"32px"}
        width={"430px"}
        sx={{ mt: 0.5, mb: 1, ml: 2.5 }}
      />
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
