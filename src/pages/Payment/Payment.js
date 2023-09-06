import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import Navigation from "../shared/Navigation/Navigation";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { url } from "../../utils/constants";
import useCart from "../hooks/useCart";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Footer from "../shared/Footer/Footer";

const Payment = () => {
  const { setCart, cart, user } = useAuth();
  const [orderInfo, setOrderInfo] = useState({
    clientName: user.displayName,
    email: user.email,
    phone: "",
    address: "",
  });
  const { clearCart } = useCart();
  const history = useHistory();

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const orderDate =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

    const order = {
      ...orderInfo,
      orderDate,
      total: Number(total).toFixed(2),
      orderProducts: cart,
      status: "Pending",
    };

    fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.insertedId) {
          setCart([]);
          clearCart();
          toast.success("Order placed successfully!");
          history.push("/dashboard/myOrders");
        }
      });
  };

  const handleOnblur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...orderInfo };
    newInfo[field] = value;
    // console.log(newInfo)
    setOrderInfo(newInfo);
  };
  return (
    <div style={{ minHeight: "95vh" }}>
      <Navigation />
      <Container>
        {cart.length ? (
          <form onSubmit={handleOrderSubmit}>
            <Grid container spacing={3} style={{ marginTop: "50px" }}>
              {/* Product Summary Side */}
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardHeader title="Confirm Order" />
                  <CardContent>
                    <Divider />

                    <h4>Contact Information</h4>
                    <TextField
                      required
                      sx={{ width: "90%", m: 1 }}
                      id="outlined-basic"
                      name="email"
                      defaultValue={user.email}
                      onBlur={handleOnblur}
                      type="email"
                      label="Your email"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      required
                      sx={{ width: "90%", m: 1 }}
                      id="outlined-basic"
                      type="text"
                      onBlur={handleOnblur}
                      name="phone"
                      label="Phone number"
                      variant="outlined"
                      fullWidth
                    />
                    <h4>Shipping Address</h4>
                    <TextField
                      required
                      sx={{ width: "90%", m: 1 }}
                      id="outlined-basic"
                      type="text"
                      defaultValue={user.displayName}
                      onBlur={handleOnblur}
                      name="clientName"
                      label="Your name"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      required
                      sx={{ width: "90%", m: 1 }}
                      id="outlined-basic"
                      type="text"
                      onBlur={handleOnblur}
                      name="address"
                      label="Address"
                      variant="outlined"
                      fullWidth
                    />
                  </CardContent>
                </Card>
              </Grid>
              {/* Payment Information Side */}
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Payment Information
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Total: ${Number(total).toFixed(2)}
                    </Typography>
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Cardholder Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      label="Expiration Date"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      label="CVC"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Confirm Order
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Typography
            variant="h4"
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Your cart is empty!
          </Typography>
        )}
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Payment;
