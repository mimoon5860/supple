import { Grid, Paper, Rating } from '@mui/material';
import React from 'react';

const DisplayReview = ({ displayReview }) => {
    const { email, name, rating, userMessage } = displayReview;
    const numberRating = parseInt(rating)
    return (
        <Grid item xs={12} md={4}>
            <Paper sx={{ textAlign: 'center' }} elevation={3}>
                <h3 >{name}</h3>
                <h4>{email}</h4>
                <p>{userMessage}</p>
                <Rating
                    name="read-only" value={numberRating} readOnly />
            </Paper>
        </Grid>
    );
};

export default DisplayReview;