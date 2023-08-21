import { Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useLipsticks from "../../hooks/useLipsticks";
import { url } from "../../../utils/constants";

const ManageAllProduct = () => {
  const [lipsticks, isLoading] = useLipsticks();
  const [remainingProducts, setRemainingProducts] = useState([]);

  useEffect(() => {
    setRemainingProducts(lipsticks);
  }, [lipsticks]);

  const deleteAproduct = (id) => {
    if (lipsticks.length > 12) {
      const confirm = window.confirm("Are You Sure?");
      if (confirm) {
        fetch(`${url}/lipsticks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              alert("Deleted Successfully");
              const remainingProducts = lipsticks.filter(
                (remaining) => remaining._id !== id
              );
              setRemainingProducts(remainingProducts);
            }
          });
      }
    } else {
      return alert("sorry! product should be more than 12");
    }
  };
  return (
    <div style={{ marginBottom: "50px" }}>
      {isLoading && <LinearProgress color="secondary" />}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
          You can manage the products
        </Typography>
        <Grid container spacing={3} sx={{ my: 2 }}>
          {remainingProducts.map((products) => (
            <Products
              key={products._id}
              products={products}
              deleteAproduct={deleteAproduct}
            ></Products>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

function Products({ products, deleteAproduct }) {
  const { _id, img, name, price } = products;
  // console.log(products)
  return (
    <Grid item xs={12} sm={12} md={6} sx={{ p: 0 }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#540D15",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: 3,
          borderRadius: "10px",
        }}
      >
        <img
          style={{ overflow: "hidden", borderRadius: "10px" }}
          width="40%"
          height="200px"
          src={img}
          alt=""
        />
        <Box sx={{ textAlign: "start", ml: 1, width: "60%", color: "white" }}>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
            {name}
          </Typography>
          <Typography variant="h5" sx={{ color: "warning.main" }}>
            ${price}
          </Typography>
          <Button
            onClick={() => deleteAproduct(_id)}
            sx={{
              backgroundColor: "white",
              color: "goldenrod",
              fontWeight: "bold",
            }}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ManageAllProduct;
