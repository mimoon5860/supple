import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Badge, TextField, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import siteIcon from "../../../images/icon.png";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const Navigation = () => {
  const { logOut, user, cart } = useAuth();
  const [searchText, setSearchText] = React.useState("");
  const history = useHistory();

  const theme = useTheme();
  const useStyle = makeStyles({
    navItem: {
      color: "#fff",
      textDecoration: "none",
    },
    navIcon: {
      [theme.breakpoints.up("sm")]: {
        display: "none !important",
      },
    },
    navItemContainer: {
      [theme.breakpoints.down("md")]: {
        display: "none !important",
      },
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    navLogo: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "right",
      },
    },
    mobileNavItem: {
      textDecoration: "none",
      color: "maroon",
      fontSize: "20px",
      display: "flex",
    },
  });
  const { navItem, navIcon, navItemContainer, navLogo, mobileNavItem } =
    useStyle();
  const [state, setState] = React.useState(false);

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <ListItemText>
            {" "}
            <Link className={mobileNavItem} to="/">
              <HomeIcon />{" "}
              <h4 style={{ margin: 0, marginLeft: "5px" }}>Home</h4>
            </Link>{" "}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            {" "}
            <Link className={mobileNavItem} to="/all_lipsticks">
              {" "}
              <TravelExploreIcon />{" "}
              <h4 style={{ margin: 0, marginLeft: "5px" }}>Explore</h4>
            </Link>{" "}
          </ListItemText>
        </ListItem>
        <Divider />

        {/* button for login users  */}
        {user.email ? (
          <Box>
            <ListItem>
              <ListItemText>
                <Link className={mobileNavItem} to="/dashboard">
                  <DashboardIcon />{" "}
                  <h4 style={{ margin: 0, marginLeft: "5px" }}>Dashboard</h4>
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                {" "}
                <Button
                  sx={{
                    color: "maroon",
                    fontWeight: "bold",
                    fontSize: "15px",
                    p: 0,
                  }}
                  className={mobileNavItem}
                  onClick={logOut}
                >
                  {" "}
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </Button>{" "}
              </ListItemText>
            </ListItem>
          </Box>
        ) : (
          <ListItem>
            <ListItemText>
              <Link className={mobileNavItem} to="/login">
                <LoginIcon />{" "}
                <h4 style={{ margin: 0, marginLeft: "5px" }}>Login</h4>
              </Link>
            </ListItemText>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  const handleSearch = () => {
    if (!searchText) {
      alert("Write something into search box.");
      return;
    }
    history.push(`/all_lipsticks?search=${searchText}`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "#540D15" }}>
        <AppBar position="static" sx={{ backgroundColor: "#540D15" }}>
          <Toolbar>
            <IconButton
              onClick={() => setState(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              className={navIcon}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={navLogo}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: "flex" }}
            >
              <Link className={navItem} to="/">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img width="80px" src={siteIcon} alt="" />
                  <h3 style={{ margin: 0 }}>Supple Smile</h3>
                </Box>
              </Link>
              <Box type="form" sx={{ display: "flex" }}>
                <TextField
                  sx={{
                    width: "300px",
                    m: 1,
                    color: "white",
                    backgroundColor: "white",
                  }}
                  InputLabelProps={{ shrink: false }}
                  value={searchText}
                  id="outlined-basic"
                  name="text"
                  placeholder="Search something..."
                  variant="outlined"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                  sx={{
                    width: "100px",
                    m: 1,
                    backgroundColor: "maroon",
                    color: "white",
                  }}
                  type="submit"
                  variant="contained"
                  // onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center" }}
              className={navItemContainer}
            >
              <Badge
                badgeContent={cart.length}
                sx={{ marginRight: "5px", cursor: "pointer" }}
                color="primary"
                onClick={() => history.push("/cart")}
              >
                <AddShoppingCartIcon color="white" />
              </Badge>
              <Link className={navItem} to="/">
                <Button color="inherit">Home</Button>
              </Link>
              <Link className={navItem} to="/all_lipsticks">
                <Button color="inherit">Explore</Button>
              </Link>

              {user.email ? (
                <Box>
                  <Link className={navItem} to="/dashboard">
                    <Button color="inherit">Dashboard</Button>
                  </Link>
                  <Button sx={{ color: "white" }} onClick={logOut}>
                    Logout
                  </Button>
                </Box>
              ) : (
                <Link className={navItem} to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <React.Fragment>
          <Drawer open={state} onClose={() => setState(false)}>
            {list}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
};

export default Navigation;
