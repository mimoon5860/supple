import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";

const Lipsticks = ({ lipstick }) => {
  const { setCart } = useAuth();
  const { setCartItem } = useCart();
  const { _id, img, name, price } = lipstick;

  const addToCart = () => {
    setCart((curr) => {
      const newItems = [];
      curr.forEach((element) => {
        if (element._id === lipstick._id) {
          newItems.push({ ...element, quantity: element.quantity + 1 });
        } else {
          newItems.push(element);
        }
      });

      const checkNewItem = newItems.find(
        (element) => element._id === lipstick._id
      );

      if (!checkNewItem) {
        newItems.push({ ...lipstick, quantity: 1 });
      }

      return newItems;
    });
    setCartItem(lipstick);
    toast.success("Product added to cart.");
  };

  return (
    <Grid item xs={12} sm={12} md={3} sx={{ p: 0 }}>
      <Paper
        elevation={0}
        sx={{ backgroundColor: "#ECE2DA", height: 500, textAlign: "center" }}
      >
        <img width="100%" height="300px" src={img} alt="" />
        <Link to={`/lipsticks/${_id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ p: 1, textTransform: "capitalize" }}>
            {name}
          </Typography>
        </Link>
        <Typography variant="h5" sx={{ color: "warning.main" }}>
          ${price}
        </Typography>

        <Button
          onClick={addToCart}
          sx={{ backgroundColor: "lightpink", color: "maroon" }}
        >
          Add to bag
        </Button>
      </Paper>
    </Grid>
  );
};

export default Lipsticks;
