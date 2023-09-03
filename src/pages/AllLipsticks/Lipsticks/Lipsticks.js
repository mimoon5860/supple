import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Lipsticks = ({ lipstick }) => {
  const { setCart, admin } = useAuth();
  const { setCartItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { _id, img, name, price, quantity: availableQuantity } = lipstick;

  const addToCart = () => {
    setCart((curr) => {
      const newItems = [];
      curr.forEach((element) => {
        if (element._id === lipstick._id) {
          newItems.push({ ...element, quantity: element.quantity + quantity });
        } else {
          newItems.push(element);
        }
      });

      const checkNewItem = newItems.find(
        (element) => element._id === lipstick._id
      );

      if (!checkNewItem) {
        newItems.push({ ...lipstick, quantity: quantity });
      }

      return newItems;
    });
    setCartItem(lipstick, quantity);
    setQuantity(1);
    toast.success("Product added to cart.");
  };

  return (
    <Grid item xs={12} sm={12} md={3} sx={{ p: 0 }}>
      <Paper
        elevation={0}
        sx={{ backgroundColor: "#ECE2DA", width: "100%", height: "100%" }}
      >
        <img width="100%" height="300px" src={img} alt="" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            padding: "5px 0",
            justifyItems: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Link to={`/lipsticks/${_id}`} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                sx={{ p: 1, textTransform: "capitalize" }}
              >
                {name}
              </Typography>
            </Link>
          </Box>

          {availableQuantity
            ? availableQuantity + " items left"
            : "Out of stock"}

          <Box>
            <Typography variant="h5" sx={{ color: "warning.main" }}>
              ${price}
            </Typography>
          </Box>

          {!admin && (
            <>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AddIcon
                    onClick={() => {
                      if (quantity < availableQuantity) {
                        setQuantity(quantity + 1);
                      } else {
                        toast.error("You already added maximum quantity!");
                      }
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
              </Box>

              {availableQuantity ? (
                <Box>
                  <Button
                    onClick={addToCart}
                    sx={{ backgroundColor: "lightpink", color: "maroon" }}
                  >
                    Add to bag
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    disabled
                    sx={{ backgroundColor: "lightpink", color: "maroon" }}
                  >
                    Add to bag
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Lipsticks;
