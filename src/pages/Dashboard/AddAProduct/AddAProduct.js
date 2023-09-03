import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { url } from "../../../utils/constants";

const AddAProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
    axios.post(`${url}/lipsticks`, data).then((res) => {
      if (res.data.insertedId) {
        alert("added successfully");
        console.log(res.data);
        reset();
      }
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add a product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("name")}
              placeholder="Product name"
            />
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("price")}
              placeholder="Price"
            />
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("brand")}
              placeholder="Product brand"
            />
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("skinFor")}
              placeholder="skin for"
            />
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("ingredients")}
              placeholder="ingredients"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="url"
              {...register("img")}
              placeholder="img"
            />
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("usage")}
              placeholder="usage"
            />
            <textarea
              required
              style={{
                width: "100%",
                height: "165px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="text"
              {...register("description")}
              placeholder="description"
            />
            <input
              required
              style={{
                width: "100%",
                height: "80px",
                padding: "15px 7px",
                marginBottom: "10px",
                border: "2px solid maroon",
                borderRadius: "5px",
              }}
              type="number"
              {...register("quantity")}
              placeholder="Quantity"
            />
          </Grid>
        </Grid>
        <input
          style={{
            width: "100%",
            padding: "15px 7px",
            marginBottom: "10px",
            border: "2px solid maroon",
            borderRadius: "5px",
            backgroundColor: "#540D15",
            fontSize: "1.2em",
            color: "white",
          }}
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddAProduct;
