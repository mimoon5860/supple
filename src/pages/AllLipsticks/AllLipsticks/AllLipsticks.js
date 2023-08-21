import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useLipsticks from "../../hooks/useLipsticks";
import Footer from "../../shared/Footer/Footer";
import Navigation from "../../shared/Navigation/Navigation";
import Lipsticks from "../Lipsticks/Lipsticks";
import { useLocation } from "react-router-dom";

const AllLipsticks = () => {
  const { search } = useLocation();
  const searchText = new URLSearchParams(search).get("search");
  const [lipsticks, isLoading] = useLipsticks(searchText);

  return (
    <div>
      <div style={{ minHeight: "95vh", marginBottom: "50px" }}>
        <Navigation></Navigation>
        {isLoading && <LinearProgress color="secondary" />}
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
            Supple Smile Lipsticks
          </Typography>
          {search ? (
            <Typography sx={{ textAlign: "center", mt: 1 }}>
              Search result for "{searchText}"
            </Typography>
          ) : (
            ""
          )}
          <Container>
            <Grid container spacing={5} sx={{ my: 2 }}>
              {lipsticks.map((lipstick) => (
                <Lipsticks key={lipstick._id} lipstick={lipstick}></Lipsticks>
              ))}
            </Grid>
          </Container>
        </Box>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllLipsticks;
