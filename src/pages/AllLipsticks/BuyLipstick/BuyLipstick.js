import {
  Alert,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import icon from "../../../images/icon.png";
import useAuth from "../../hooks/useAuth";
import Footer from "../../shared/Footer/Footer";
import Navigation from "../../shared/Navigation/Navigation";
import { url } from "../../../utils/constants";

const BuyLipstick = () => {
  const [buyLipstick, setBuyLipstick] = useState({});
  const { lipstickId } = useParams();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const getSingleLipstick = () => {
    axios
      .get(`${url}/lipsticks/${lipstickId}`)
      .then((res) => {
        const myLipstick = res.data;
        setBuyLipstick(myLipstick);
        console.log({ myLipstick });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => getSingleLipstick(), []);

  return (
    <>
      <div style={{ minHeight: "95vh" }}>
        <Navigation></Navigation>
        {isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Container sx={{ my: 5 }}>
            <Grid container spacing={2}>
          
              <Grid item xs={12} md={3}>
                <div style={{ color: "maroon", textAlign: "start" }}>
                  <h2>{buyLipstick?.name}</h2>
                  <h4>-By {buyLipstick?.brand}</h4>
                  <h4>-For {buyLipstick.skinFor}</h4>
                  <h3>${buyLipstick?.price} USD </h3>
                </div>
                <img width="300px" height="300" src={buyLipstick?.img} alt="" />
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper elevation={0}>
                  <h2 style={{ margin: 0 }}>Details</h2>
                  <p style={{ marginLeft: "40px" }}>
                    {buyLipstick?.description}
                  </p>
                  <h2 style={{ margin: 0 }}>What is in it?</h2>
                  <p style={{ marginLeft: "40px" }}>
                    {buyLipstick?.ingredients}
                  </p>
                  <h2 style={{ margin: 0 }}>How to use?</h2>
                  <p style={{ marginLeft: "40px" }}>{buyLipstick?.usage}</p>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default BuyLipstick;
