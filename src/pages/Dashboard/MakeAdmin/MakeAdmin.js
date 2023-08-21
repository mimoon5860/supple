import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { url } from "../../../utils/constants";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [adminSuccess, setAdminSuccess] = useState(false);

  const handleAdminOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch(`${url}/users/admin`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setAdminSuccess(true);
          setEmail("");
          console.log(data);
        }
      });
    e.target.reset();
    e.preventDefault();
  };
  return (
    <Container>
      <h1>Make an admin</h1>
      {adminSuccess && (
        <Alert severity="success">Admin added successfully!</Alert>
      )}
      <form onSubmit={handleAdminSubmit}>
        <TextField
          style={{ width: "50%", height: "50px" }}
          id="outlined-basic"
          label="Admin Email"
          variant="outlined"
          onBlur={handleAdminOnBlur}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "maroon",
            color: "white",
            width: "200px",
            marginLeft: "10px",
            height: "50px",
          }}
        >
          Add Admin
        </Button>
      </form>
    </Container>
  );
};

export default MakeAdmin;
