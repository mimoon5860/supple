import { Container } from "@material-ui/core";
import { Grid, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import { url } from "../../../utils/constants";

const ManageAllOrders = () => {
  const [manageAllOrders, setManageAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getManageOrders = () => {
    axios
      .get(`${url}/orders`)
      .then((res) => {
        const manageOrders = res.data;
        setManageAllOrders(manageOrders);
        // console.log(manageOrders)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => getManageOrders(), []);

  const handleDeleteOrder = (id) => {
    const confirm = window.confirm("Are You Sure to?");
    if (confirm) {
      const url = `${url}/orders/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
            const remainingOrders = manageAllOrders.filter(
              (manageAllOrder) => manageAllOrder._id !== id
            );
            setManageAllOrders(remainingOrders);
          }
        });
    }
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Container>
          <h1 style={{ textAlign: "center", color: "goldenrod" }}>
            Manage all orders
          </h1>
          <Grid container spacing={2}>
            {manageAllOrders.map((order) => (
              <Order
                key={order._id}
                order={order}
                handleDeleteOrder={handleDeleteOrder}
              ></Order>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default ManageAllOrders;
