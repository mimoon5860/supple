import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Navigation from "../shared/Navigation/Navigation";
import useAuth from "../hooks/useAuth";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Footer from "../shared/Footer/Footer";
import { useState } from "react";
import { url } from "../../utils/constants";
import useCart from "../hooks/useCart";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Cart() {
  const { setCart, cart, user } = useAuth();
  const { removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    clientName: user.displayName,
    email: user.email,
    phone: "",
    address: "",
  });
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
      total,
      orderProducts: cart,
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

  const handleRemoveFromCart = (id) => {
    const filtred = cart.filter((item) => item._id !== id);
    setCart(filtred);
    removeItem(id);
  };

  return (
    <>
      <div style={{ minHeight: "95vh" }}>
        <Navigation />
        <Container>
          {cart.length ? (
            <Grid container spacing={3} style={{ marginTop: "50px" }}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      {cart.map((myLipstick) => {
                        return (
                          <Grid key={myLipstick._id} item xs={12} md={6}>
                            <Paper elevation={0}>
                              <Box sx={{ display: "flex" }}>
                                <Box
                                  style={{
                                    overflow: "hidden",
                                    marginRight: "20px",
                                  }}
                                >
                                  <img
                                    style={{ overflow: "hidden" }}
                                    width="50px"
                                    height="50px"
                                    src={myLipstick.img}
                                    alt=""
                                  />
                                </Box>
                                <Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gridGap: "5px",
                                      alignItems: "center",
                                      justifyItems: "",
                                    }}
                                  >
                                    <Link to={`/lipsticks/${myLipstick._id}`}>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          p: 1,
                                          textTransform: "capitalize",
                                          ml: 1,
                                        }}
                                      >
                                        {myLipstick.name}
                                      </Typography>
                                    </Link>
                                    <RemoveCircleIcon
                                      onClick={() =>
                                        handleRemoveFromCart(myLipstick._id)
                                      }
                                      sx={{
                                        backgroundColor: "maroon",
                                        color: "white",
                                        border: 1,
                                        p: 1,
                                        borderRadius: "50%",
                                        mr: 1,
                                        cursor: "pointer",
                                        fontSize: "10px",
                                      }}
                                    />
                                  </Box>
                                  <Divider />
                                  <Box>
                                    <Typography
                                      variant="body1"
                                      sx={{ ml: 1, color: "warning.main" }}
                                    >
                                      ${myLipstick.price} *{" "}
                                      {myLipstick.quantity} = $
                                      {myLipstick.price * myLipstick.quantity}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Paper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4}>
                <Card>
                  <CardHeader title="Confirm Order" />
                  <CardContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Total: ${total}
                    </Typography>
                    <Divider />
                    <form onSubmit={handleOrderSubmit}>
                      <h4>Contact Information</h4>
                      <TextField
                        required
                        sx={{ width: "90%", m: 1 }}
                        id="outlined-basic"
                        name="email"
                        defaultValue={user.email}
                        onBlur={handleOnblur}
                        type="email"
                        label="your email"
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
                        label="phone number"
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
                        label="your name"
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
                        label="address"
                        variant="outlined"
                        fullWidth
                      />
                      <button
                        type="submit"
                        style={{ margin: "5px", width: "100%" }}
                      >
                        <h3>Order Now</h3>
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
      </div>
      <Footer></Footer>
    </>
  );
}
