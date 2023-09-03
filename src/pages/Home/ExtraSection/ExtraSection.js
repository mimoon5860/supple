import { Button, Container, Divider, Grid, Box } from "@mui/material";
import React from "react";

const ExtraSection = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ color: "red" }}>Discover Beauty tips</h4>
        <h1>News For You</h1>
        <img
          src="https://cdn.shopify.com/s/files/1/2644/9976/files/title_img_69x23.png?v=1516853410"
          alt=""
        />
      </div>
      <div>
        <Grid container spacing={2} sx={{ my: 3 }}>
          <Grid item xs={12} md={6}>
            <Box elevation={0}>
              <Box>
                <img
                  width="100%"
                  src="https://cdn.shopify.com/s/files/1/2644/9976/articles/b-11_8370f83e-1c52-4abe-bea2-19ac3d15d8cb_grande.jpg?v=1517212931"
                  alt=""
                />
                <div style={{ marginTop: "-25px", textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      fontWeight: "bold",
                      px: 3,
                      mr: 3,
                    }}
                  >
                    Smudge me not lipstick
                  </Button>
                </div>
              </Box>
              <Box>
                <p>
                  Wave goodbye to your favorite pink gloss and number one nude:
                  Halloween is just around the corner and things are about to
                  get viciously vampy.Spook season is just as much about
                  ghoulish makeup as it is crazy costumes, and one thing we love
                  about October is the fact that we can rock a petrifying pout
                  without question.
                </p>
                <Divider />
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      fontWeight: "bold",
                      px: 3,
                    }}
                  >
                    31st December
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box elevation={0}>
              <Box>
                <img
                  width="100%"
                  src="https://cdn.shopify.com/s/files/1/2644/9976/articles/b-3_53fec30c-98ff-4c2a-8942-9e9a3eac0eb0_grande.jpg?v=1517212979"
                  alt=""
                />
                <div style={{ marginTop: "-25px", textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      fontWeight: "bold",
                      px: 3,
                      mr: 3,
                    }}
                  >
                    {" "}
                    Brick red for haloween queen
                  </Button>
                </div>
              </Box>
              <Box>
                <p>
                  Wave goodbye to your favorite pink gloss and number one nude:
                  Halloween is just around the corner and things are about to
                  get viciously vampy.Spook season is just as much about
                  ghoulish makeup as it is crazy costumes, and one thing we love
                  about October is the fact that we can rock a petrifying pout
                  without question.
                </p>
                <Divider />
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      fontWeight: "bold",
                      px: 3,
                    }}
                  >
                    31st December
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ExtraSection;
