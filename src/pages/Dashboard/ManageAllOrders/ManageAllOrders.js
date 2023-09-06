import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/constants";
import {
  Box,
  Collapse,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import UpdateModal from "./UpdateModal";

function Row(props) {
  const { row, handleDeleteOrder, updateOrder } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row._id}</TableCell>
        <TableCell align="left">{row.orderDate}</TableCell>
        <TableCell align="left">${row.total}</TableCell>
        <TableCell align="left">{row.clientName}</TableCell>
        <TableCell align="left">
          <Typography>Address: {row.address}</Typography>
          <Typography>Phone: {row.phone}</Typography>
        </TableCell>
        <TableCell align="left">
          {row.status ? row.status : "Delivered"}
        </TableCell>
        <TableCell align="left">
          <UpdateIcon
            sx={{ cursor: "pointer" }}
            onClick={() => updateOrder(row._id)}
          />
        </TableCell>
        <TableCell align="left">
          <DeleteForeverIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteOrder(row._id, row.status)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography fontWeight="bold" gutterBottom component="div">
                Order Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderProducts.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell component="th" scope="row">
                        <Link to={`/lipsticks/${historyRow._id}`}>
                          {historyRow.name}
                        </Link>
                      </TableCell>
                      <TableCell>${historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>
                      <TableCell align="right">
                        $
                        {Number(historyRow.price * historyRow.quantity).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#540D15",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ManageAllOrders = () => {
  const [manageAllOrders, setManageAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState({ id: 0, status: "" });
  const [open, setOpen] = useState(false);

  const getManageOrders = () => {
    axios
      .get(`${url}/orders`)
      .then((res) => {
        const manageOrders = res.data;
        setManageAllOrders(manageOrders);
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

  const updateOrder = (id, status = "Delivered") => {
    setModalData({ id, status });

    setOpen(true);
  };

  const updateDone = (data) => {
    const newData = manageAllOrders.map((item) => {
      if (item._id === data.id) {
        return { ...item, status: data.status };
      } else {
        return item;
      }
    });
    setManageAllOrders(newData);
  };

  console.log(manageAllOrders);

  return (
    <div style={{ marginBottom: "50px" }}>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Products</StyledTableCell>
                  <StyledTableCell align="left">Order Id</StyledTableCell>
                  <StyledTableCell align="left">Order Date</StyledTableCell>
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="left">Customer</StyledTableCell>
                  <StyledTableCell align="left">
                    Shipping Address
                  </StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Update</StyledTableCell>
                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {manageAllOrders.map((row) => (
                  <Row
                    key={row._id}
                    row={row}
                    handleDeleteOrder={handleDeleteOrder}
                    updateOrder={updateOrder}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <UpdateModal
        data={modalData}
        open={open}
        setOpen={setOpen}
        updateDone={updateDone}
      />
    </div>
  );
};

export default ManageAllOrders;
