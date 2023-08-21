import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";

const MyHomeLipsticks = ({ myLipstick }) => {
  const { img, name, _id, price, brand } = myLipstick;
  const { setCart } = useAuth();
  const { setCartItem } = useCart();

  const addToCart = () => {
    setCart((curr) => {
      const newItems = [];
      curr.forEach((element) => {
        if (element._id === myLipstick._id) {
          newItems.push({ ...element, quantity: element.quantity + 1 });
        } else {
          newItems.push(element);
        }
      });

      const checkNewItem = newItems.find(
        (element) => element._id === myLipstick._id
      );

      if (!checkNewItem) {
        newItems.push({ ...myLipstick, quantity: 1 });
      }

      return newItems;
    });
    setCartItem(myLipstick);
    toast.success("Product added to cart.");
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={0}>
        <Box sx={{ display: "flex" }}>
          <Box style={{ width: "40%", overflow: "hidden" }}>
            <img
              style={{ overflow: "hidden" }}
              width="180px"
              height="180px"
              src={img}
              alt=""
            />
          </Box>
          <Box width="60%">
            <Link to={`/lipsticks/${_id}`}>
              <Typography
                variant="h6"
                sx={{ p: 1, textTransform: "capitalize", ml: 1 }}
              >
                {name}
              </Typography>
            </Link>

            <Typography sx={{ p: 1, ml: 1 }}>{brand}</Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h5" sx={{ ml: 1, color: "warning.main" }}>
                ${price}
              </Typography>

              <Box onClick={addToCart}>
                <ShoppingBasketOutlinedIcon
                  sx={{
                    backgroundColor: "maroon",
                    color: "white",
                    border: 1,
                    p: 1,
                    borderRadius: "50%",
                    mr: 1,
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default MyHomeLipsticks;
