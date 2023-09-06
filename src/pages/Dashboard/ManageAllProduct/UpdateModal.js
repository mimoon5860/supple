import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Fade, Grid, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../../../utils/constants";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateModal = ({ data, open, setOpen, updateDone }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const {
    _id,
    img,
    name,
    price,
    skinFor,
    usage,
    ingredients,
    description,
    brand,
    quantity,
  } = data;

  useEffect(() => {
    reset();
  }, [data]);

  const onSubmit = (data) => {
    console.log({ data });
    setLoading(true);
    axios.put(`${url}/lipsticks/${_id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        alert("Updated successfully");
        updateDone({ ...data, _id });
        setLoading(false);
        setOpen(false);
      }
      setLoading(false);
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        reset();
        setOpen(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <input
                  required
                  defaultValue={name}
                  style={{
                    width: "100%",
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
                  defaultValue={price}
                  style={{
                    width: "100%",
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
                  defaultValue={brand}
                  style={{
                    width: "100%",
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
                  defaultValue={skinFor}
                  style={{
                    width: "100%",
                    height: "70px",
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
                  defaultValue={ingredients}
                  style={{
                    width: "100%",
                    height: "70px",
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
                  defaultValue={img}
                  style={{
                    width: "100%",
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
                  defaultValue={usage}
                  style={{
                    width: "100%",
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
                  defaultValue={description}
                  style={{
                    width: "100%",
                    height: "140px",
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
                  defaultValue={quantity || 0}
                  style={{
                    width: "100%",
                    padding: "15px 7px",
                    marginBottom: "10px",
                    border: "2px solid maroon",
                    borderRadius: "5px",
                  }}
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  placeholder="Quantity"
                />
              </Grid>
            </Grid>
            {loading ? (
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
                value="Loading..."
                type="submit"
                disabled
              />
            ) : (
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
                value="Update Product"
                type="submit"
              />
            )}
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
