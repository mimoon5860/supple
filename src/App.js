import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import AllLipsticks from "./pages/AllLipsticks/AllLipsticks/AllLipsticks";
import BuyLipstick from "./pages/AllLipsticks/BuyLipstick/BuyLipstick";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Home from "./pages/Home/Home/Home";
import Login from "./pages/Login/Login/Login";
import PrivateRoute from "./pages/Login/PrivateRoute/PrivateRoute";
import Register from "./pages/Login/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import { Toaster } from "react-hot-toast";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/all_lipsticks">
              <AllLipsticks></AllLipsticks>
            </Route>
            <PrivateRoute path="/lipsticks/:lipstickId">
              <BuyLipstick></BuyLipstick>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/cart">
              <Cart></Cart>
            </Route>
            <PrivateRoute path="/payment">
              <Payment></Payment>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
