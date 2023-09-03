import React, { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { Container, Rating } from "@mui/material";
import { Box } from "@mui/system";
import useAuth from "../../hooks/useAuth";
import { url } from "../../../utils/constants";
import { useHistory } from "react-router-dom";

const Review = () => {
  // const [value, setValue] = React.useState(0);
  const { user } = useAuth();
  const initialInfo = { email: user.email, name: user.displayName };
  const [review, setReview] = useState(initialInfo);
  const history = useHistory();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newReviewData = { ...review };
    newReviewData[field] = value;
    setReview(newReviewData);
    console.log(newReviewData);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();

    // send to server
    fetch(`${url}/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.insertedId) {
          alert("thanks for your review");
        }
      });
    e.target.reset();
    history.push("/#reviews");
  };

  return (
    <Container>
      <h1>What Say?</h1>
      <form onSubmit={handleSubmitReview}>
        <TextareaAutosize
          required
          maxRows={12}
          name="userMessage"
          onBlur={handleOnBlur}
          aria-label="maximum height"
          placeholder="Please say something"
          style={{ width: "90%", height: "150px" }}
        />
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <p>what's your rating?</p>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating name="rating" onBlur={handleOnBlur} />
            <button
              type="submit"
              style={{
                border: 0,
                marginLeft: "10px",
                backgroundColor: "maroon",
                color: "white",
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingTop: "5px",
                paddingBottom: "5px",
                cursor: "pointer",
              }}
            >
              Review
            </button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default Review;
