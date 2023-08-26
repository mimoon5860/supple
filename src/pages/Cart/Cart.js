import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Navigation from "../shared/Navigation/Navigation";
import useAuth from "../hooks/useAuth";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Footer from "../shared/Footer/Footer";
import useCart from "../hooks/useCart";
import { useHistory } from "react-router-dom";
export default function Cart() {
  const { setCart, cart } = useAuth();
  const { removeItem } = useCart();

  const history = useHistory();

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

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
                                      {Number(
                                        myLipstick.price * myLipstick.quantity
                                      ).toFixed(2)}
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
                      Total: ${Number(total).toFixed(2)}
                    </Typography>
                    <hr />
                    <button
                      onClick={() => history.push("/payment")}
                      style={{ margin: "5px", width: "100%" }}
                    >
                      <h3>Order Now</h3>
                    </button>
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
