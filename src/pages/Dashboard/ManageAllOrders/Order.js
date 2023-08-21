import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Order = ({ order, handleDeleteOrder }) => {
  const {
    clientName,
    address,
    orderDate,
    _id,
    total,
    email,
    phone,
    orderProducts,
  } = order;

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader
          title={"Date: " + orderDate}
          action={
            <DeleteOutlineIcon
              sx={{ cursor: "pointer", color: "red" }}
              onClick={() => handleDeleteOrder(_id)}
            />
          }
        />
        <Divider />
        <CardContent>
          <Box>
            <Typography>Client Name: {clientName}</Typography>
            <Typography>Address: {address}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Phone: {phone}</Typography>
            <Typography>Total Price: ${total}</Typography>
          </Box>
          <Box mt={3}>
            <Grid container spacing={2}>
              {orderProducts.map((product) => {
                return (
                  <Grid key={product._id} xs={6} item>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <img
                            src={product.img}
                            width={50}
                            height={50}
                            alt="product"
                          />
                          <Typography>
                            <Link to={`/lipsticks/${product._id}`}>
                              {product.name}
                            </Link>
                          </Typography>
                        </Box>
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>Price: ${product.price}</Typography>
                          <Typography>Quantity: {product.quantity}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Order;
