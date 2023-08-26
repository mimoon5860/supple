import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useAuth from "../../hooks/useAuth";
import Footer from "../../shared/Footer/Footer";
import Navigation from "../../shared/Navigation/Navigation";
import { url } from "../../../utils/constants";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";

const BuyLipstick = () => {
  const [buyLipstick, setBuyLipstick] = useState({});
  const { lipstickId } = useParams();
  const { setCart } = useAuth();
  const { setCartItem } = useCart();
  const [quantity, setQuantity] = useState(1);

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

  const addToCart = () => {
    setCart((curr) => {
      const newItems = [];
      curr.forEach((element) => {
        if (element._id === buyLipstick._id) {
          newItems.push({ ...element, quantity: element.quantity + quantity });
        } else {
          newItems.push(element);
        }
      });

      const checkNewItem = newItems.find(
        (element) => element._id === buyLipstick._id
      );

      if (!checkNewItem) {
        newItems.push({ ...buyLipstick, quantity: quantity });
      }

      return newItems;
    });
    setCartItem(buyLipstick, quantity);
    setQuantity(1);
    toast.success("Product added to cart.");
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
              <Grid item xs={12} md={6}>
                <img width="300px" height="300" src={buyLipstick?.img} alt="" />
                <div style={{ color: "maroon", textAlign: "start" }}>
                  <h2>{buyLipstick?.name}</h2>
                  <h4>-By {buyLipstick?.brand}</h4>
                  <h4>-For {buyLipstick.skinFor}</h4>
                  <h3>${buyLipstick?.price} USD </h3>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "50px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AddIcon
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                      sx={{
                        color: "white",
                        backgroundColor: "#800000",
                        borderRadius: "5px 0 0 5px",
                        cursor: "pointer",
                      }}
                    />
                    <Typography
                      variant="body"
                      sx={{ border: "1px solid #800000", padding: "0 5px" }}
                    >
                      {quantity}
                    </Typography>
                    <RemoveIcon
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        } else {
                          toast.error("You cannot remove more quantity!");
                        }
                      }}
                      sx={{
                        color: "white",
                        backgroundColor: "#800000",
                        borderRadius: "0px 5px 5px 0px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Button
                    onClick={addToCart}
                    sx={{ backgroundColor: "lightpink", color: "maroon" }}
                  >
                    Add to bag
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
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
