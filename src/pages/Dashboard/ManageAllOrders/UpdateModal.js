import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  Box,
  Button,
  Divider,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import axios from "axios";
import { url } from "../../../utils/constants";

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
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState(data);

  useEffect(() => {
    setNewStatus(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${url}/orders/${newStatus.id}`, { status: newStatus.status })
      .then((res) => {
        if (res.data.modifiedCount) {
          alert("Updated successfully");
          updateDone({ id: newStatus.id, status: newStatus.status });
          setLoading(false);
          setOpen(false);
        }
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setNewStatus({ id: newStatus.id, status: event.target.value });
  };

  console.log({ newStatus });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="custom-select" style={{ width: "200px" }}>
              <Select
                value={newStatus.status}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                fullWidth
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </Select>
            </div>
            <Divider />
            <Box sx={{ textAlign: "center" }} mt={3}>
              {loading ? (
                <Button
                  disabled
                  variant="outlined"
                  color="secondary"
                  type="submit"
                >
                  Please wait...
                </Button>
              ) : (
                <Button variant="outlined" color="secondary" type="submit">
                  Update
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
