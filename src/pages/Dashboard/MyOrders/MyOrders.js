import { Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Order from "../ManageAllOrders/Order";
import { url } from "../../../utils/constants";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/orders?email=${user.email}`)
      .then((res) => {
        const myallOrder = res.data;
        setMyOrders(myallOrder);
        // console.log(manageOrders)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.email]);

  const handleDeleteOrder = (id) => {
    const confirm = window.confirm("Are You Sure to?");
    if (confirm) {
      fetch(`${url}/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
            const remainingOrders = myOrders.filter(
              (myOrders) => myOrders._id !== id
            );
            setMyOrders(remainingOrders);
          }
        });
    }
  };

  console.log({ myOrders });

  return (
    <div>
      <h1>My all orders</h1>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Box>
          {myOrders.length ? (
            <Grid container spacing={2}>
              {myOrders.map((order) => (
                <Order
                  key={order._id}
                  order={order}
                  setMyOrders={setMyOrders}
                  handleDeleteOrder={handleDeleteOrder}
                ></Order>
              ))}
            </Grid>
          ) : (
            <Box sx={{ color: "goldenrod" }}>
              {" "}
              <h1>You didn't order any product</h1>{" "}
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default MyOrders;
