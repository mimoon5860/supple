import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
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
function Row(props) {
  const { row, handleDeleteOrder } = props;
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
        <TableCell align="left">
          <Typography>Address: {row.address}</Typography>
          <Typography>Phone: {row.phone}</Typography>
        </TableCell>
        <TableCell align="left">{row.status || "Delivered"}</TableCell>
        <TableCell align="left">
          <DeleteForeverIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteOrder(row._id)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Products
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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#540D15",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

  return (
    <div>
      <h1>My Orders</h1>
      {isLoading ? (
        <LinearProgress />
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
                  <StyledTableCell align="left">
                    Shipping Address
                  </StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myOrders.map((row) => (
                  <Row
                    key={row._id}
                    row={row}
                    handleDeleteOrder={handleDeleteOrder}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default MyOrders;
