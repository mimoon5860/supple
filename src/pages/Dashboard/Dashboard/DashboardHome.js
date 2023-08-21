import { Button, Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const DashboardHome = () => {
    const { admin, user } = useAuth()
    return (
        <Container>

            <Grid container spacing={2} >
                <Grid item xs={12} md={6}>
                    {admin ?
                        <Paper elevation={0}>
                            <h3>Hello Admin!</h3>
                            <p>Admin is the role with the highest level of access to your website. Admins can add content on all pages and access all items in the Admin Toolbar. This means that Admins can control site-wide settings like the design of your website and the homepage layout. They can add and delete other admin users, and can approve or deny edits made by authors.</p>
                            <li>You can add a product</li>
                            <li>You can manage all product</li>
                            <li>You can manage the orders</li>
                            <li>You can make person as admin</li>
                        </Paper> :
                        <Paper elevation={0}>
                            <h3>Hello {user.displayName}!</h3>
                            <p>We have that all products those you're finding for a couple of times. Now the times begin to start shopping. let's go ------</p>
                            <li>You can see your orders</li>
                            <li>We have all payment system.</li>
                            <li>you can choose your porduct</li>
                            <NavLink to="/dashboard/myOrders"> <Button >See your orders</Button> </NavLink>
                        </Paper>}
                </Grid>
            </Grid>


        </Container>
    );
};

export default DashboardHome;