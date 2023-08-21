import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'red' }}>Page not found</h3>
            <img src="https://i.ibb.co/zJbt7TD/download.png" alt="" />
            <br />
            <NavLink to="/">
                <Button>Go to home</Button>
            </NavLink>
        </div>
    );
};

export default NotFound;