import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MyHomeLipsticks = ({ myLipstick }) => {
  const { img, name, _id, price, brand } = myLipstick;
  const [quantity, setQuantity] = useState(1);
  const { setCart, admin } = useAuth();
  const { setCartItem } = useCart();

  const addToCart = () => {
    setCart((curr) => {
      const newItems = [];
      curr.forEach((element) => {
        if (element._id === myLipstick._id) {
          newItems.push({ ...element, quantity: element.quantity + quantity });
        } else {
          newItems.push(element);
        }
      });

      const checkNewItem = newItems.find(
        (element) => element._id === myLipstick._id
      );

      if (!checkNewItem) {
        newItems.push({ ...myLipstick, quantity: quantity });
      }

      return newItems;
    });
    setCartItem(myLipstick, quantity);
    setQuantity(1);
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
              {!admin && (
                <>
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
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default MyHomeLipsticks;
