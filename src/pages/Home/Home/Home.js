import { Container, Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayReview from "../../Dashboard/Review/DisplayReview";
import Footer from "../../shared/Footer/Footer";
import Navigation from "../../shared/Navigation/Navigation";

import Banner from "../Banner/Banner";
import ExtraSection from "../ExtraSection/ExtraSection";
import HomeLipsticks from "../HomeLipsticks/HomeLipsticks";
import { url } from "../../../utils/constants";

const Home = () => {
  const [reviewLoading, setReviewLoading] = useState(true);
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/review`)
      .then((res) => {
        const allReview = res.data;
        setReview(allReview);
        // console.log(manageOrders)
      })
      .finally(() => {
        setReviewLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{ minHeight: "95vh", marginBottom: "80px" }}>
        <Navigation></Navigation>
        <Banner></Banner>
        {reviewLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Box>
            <HomeLipsticks></HomeLipsticks>
            <Container sx={{ my: 8 }}>
              <h1 style={{ textAlign: "center", color: "goldenrod" }}>
                What's our client says?
              </h1>
              <Grid container spacing={5} sx={{ my: 2 }}>
                {review.map((displayReview) => (
                  <DisplayReview
                    key={displayReview._id}
                    displayReview={displayReview}
                  ></DisplayReview>
                ))}
              </Grid>
            </Container>
          </Box>
        )}
        <ExtraSection></ExtraSection>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
