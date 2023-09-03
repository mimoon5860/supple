import { Button, Grid, LinearProgress, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useLipsticks from "../../hooks/useLipsticks";
import { url } from "../../../utils/constants";
import UpdateModal from "./UpdateModal";

const ManageAllProduct = () => {
  const [lipsticks, isLoading] = useLipsticks();
  const [remainingProducts, setRemainingProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
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

  const handleUpdate = (data) => {
    setModalData(data);
    setOpen(true);
  };

  const updateDone = (data) => {
    const newData = remainingProducts.map((item) => {
      if (item._id === data._id) {
        return data;
      } else {
        return item;
      }
    });
    setRemainingProducts(newData);
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
              handleUpdate={handleUpdate}
            ></Products>
          ))}
        </Grid>
      </Box>
      <UpdateModal
        data={modalData}
        open={open}
        setOpen={setOpen}
        updateDone={updateDone}
      />
    </div>
  );
};

function Products({ products, deleteAproduct, handleUpdate }) {
  const { _id, img, name, price, quantity } = products;
  console.log({ products });
  return (
    <Grid item xs={12} sm={12} md={6} sx={{ p: 0 }}>
      <Box
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
          <Typography variant="h5" sx={{ color: "warning.main" }}>
            Quantity: {quantity || 0}
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => handleUpdate(products)}
              sx={{
                backgroundColor: "white",
                color: "goldenrod",
                fontWeight: "bold",
              }}
            >
              Update
            </Button>
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
        </Box>
      </Box>
    </Grid>
  );
}

export default ManageAllProduct;
