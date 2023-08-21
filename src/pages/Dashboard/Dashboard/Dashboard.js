import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    NavLink
} from "react-router-dom";
import icon from '../../../images/icon.png'
import MyOrders from '../MyOrders/MyOrders';
import { Button } from '@mui/material';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import useAuth from '../../hooks/useAuth';
import Payment from '../Payment/Payment'
import Review from '../Review/Review';
import ManageAllProduct from '../ManageAllProduct/ManageAllProduct';
import AddAProduct from '../AddAProduct/AddAProduct';
import Footer from '../../shared/Footer/Footer';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import PaymentIcon from '@mui/icons-material/Payment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import ShoppingBasketTwoToneIcon from '@mui/icons-material/ShoppingBasketTwoTone';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import DashboardHome from './DashboardHome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotFound from '../../NotFound/NotFound';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}


const drawerWidth = 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { logOut, admin, user } = useAuth()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Box display="flex" flexDirection="column" alignItems="start">
                <NavLink to='/' activeClassName="active" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: 'text.secondary' }}><HomeIcon sx={{ color: pink[500], mr: 1 }} /> Home</Button>
                </NavLink>

                {/* routes for users  */}
                {!admin &&
                    <Box>
                        <NavLink to={`${url}`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}> <DashboardIcon sx={{ color: pink[500], mr: 1 }} /> Dashboard</Button>
                        </NavLink>
                        <NavLink to={`${url}/myOrders`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}> <BookmarkAddedIcon sx={{ color: pink[500], mr: 1 }} /> My Orders</Button>
                        </NavLink>

                        <NavLink to={`${url}/payment`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}><PaymentIcon sx={{ color: pink[500], mr: 1 }} /> Payment</Button>
                        </NavLink>
                        <br />
                        <NavLink to={`${url}/review`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}><ReviewsIcon sx={{ color: pink[500], mr: 1 }} /> Review</Button>
                        </NavLink>
                    </Box>}

                {/* routes for admin  */}
                {admin &&
                    <Box>
                        <NavLink to={`${url}/manage_all_orders`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}><ManageAccountsIcon sx={{ color: pink[500], mr: 1 }} /> Manage All Orders</Button>
                        </NavLink>

                        <NavLink to={`${url}/add_a_product`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}><AddShoppingCartTwoToneIcon sx={{ color: pink[500], mr: 1 }} />Add a product</Button>
                        </NavLink>

                        <NavLink to={`${url}/manage_all_products`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}><ShoppingBasketTwoToneIcon sx={{ color: pink[500], mr: 1 }} />Manage All Product</Button>
                        </NavLink>
                        <NavLink to={`${url}/make_admin`} activeClassName="active" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'text.secondary' }}><PersonAddTwoToneIcon sx={{ color: pink[500], mr: 1 }} />Make Admin</Button>
                        </NavLink></Box>}
                <Button sx={{ color: 'text.secondary' }} onClick={logOut}><LogoutTwoToneIcon sx={{ color: pink[500], mr: 1 }} />  Logout</Button>
            </Box>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ backgroundColor: '#540D15' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}><img width="15%" height="20%" src={icon} alt="" />
                            <h3>{user.displayName}</h3></div>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}

            >
                <Toolbar />
                {/* users dashboard  */}
                <div style={{ minHeight: '83vh' }}>
                    <Switch>
                        <Route exact path={path}>
                            <DashboardHome></DashboardHome>
                        </Route>
                        <Route path={`${path}/myOrders`}>
                            <MyOrders></MyOrders>
                        </Route>
                        <Route path={`${path}/payment`}>
                            <Payment></Payment>
                        </Route>
                        <Route path={`${path}/review`}>
                            <Review></Review>
                        </Route>

                        <AdminRoute path={`${path}/manage_all_orders`}>
                            <ManageAllOrders></ManageAllOrders>
                        </AdminRoute>
                        <AdminRoute path={`${path}/add_a_product`}>
                            <AddAProduct></AddAProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/manage_all_products`}>
                            <ManageAllProduct></ManageAllProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/make_admin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <Route path={`${path}/*`}>
                            <NotFound></NotFound>
                        </Route>
                    </Switch>
                </div>
                <div>
                    <Footer></Footer>
                </div>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
