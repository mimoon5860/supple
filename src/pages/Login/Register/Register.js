import { Button, Container, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import divider from '../../../images/divider.png';
import { Box } from '@mui/system';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../../images/icon.png';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import googleIcon from '../../../images/googleIcon.png'
import Footer from '../../shared/Footer/Footer';

// background image 
const bg = {
    background: `url(${'https://cdn.shopify.com/s/files/1/2644/9976/files/img12_0fec216f-46f5-463e-9aad-fc4ced4d0048.jpg?v=1516174060'})`,
    backgroundSize: 'cover',
    width: 700,
    height: 700,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(82, 5, 5,0.8)',
    backgroundBlendMode: 'darken, luminosity'
}

// google button 
const googleButton = {
    backgroundImage: 'linear-gradient(to right,pink,maroon)',
}
const Register = () => {
    const [loginData, setLoginData] = useState({});
    const { registerUser, signInUsingGoogle, isLoading, authError } = useAuth();
    const history = useHistory()
    const location = useLocation();


    const handleGoogleSignIn = () => {
        signInUsingGoogle(location, history)
    }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        // console.log(newLoginData)
        setLoginData(newLoginData);
    }
    const handleOnsubmitRegister = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }
    return (
        <div>
            <Container sx={{ mt: 8 }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} >
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <img width="20%" height="20%" src={icon} alt="" />
                            <Typography variant="h4" sx={{ color: 'maroon', fontWeight: 'light', my: 5 }}>
                                Supple Smile</Typography>
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Create your account</Typography>
                        {/* Continue with google  */}
                        <Button onClick={handleGoogleSignIn} style={googleButton} sx={{ width: '75%', m: 1, color: 'white' }}>
                            <img style={{ marginRight: "20px" }} width="30px" src={googleIcon} alt="" />
                            Continue with google</Button>
                        <div><img width="75%" src={divider} alt="" /></div>

                        {/* {user?.email && <Alert severity="success">User Created Successfully!</Alert>} */}
                        {
                            authError && <Alert severity="error">{authError}</Alert>
                        }

                        {
                            isLoading ? <LinearProgress color="secondary" />
                                :
                                <form onSubmit={handleOnsubmitRegister}>
                                    <TextField
                                        sx={{ width: '75%', m: 1, }}
                                        required
                                        id="outlined-basic"
                                        name="name"
                                        onBlur={handleOnBlur}
                                        label="your name"
                                        variant="outlined"
                                    />
                                    <TextField
                                        sx={{ width: '75%', m: 1, }}
                                        required
                                        id="outlined-basic"
                                        name="email"
                                        onBlur={handleOnBlur}
                                        label="your email"
                                        variant="outlined"
                                    />
                                    <TextField
                                        sx={{ width: '75%', m: 1, }}
                                        id="outlined-basic"
                                        name="password"
                                        type="password"
                                        onBlur={handleOnBlur}
                                        label="your password"
                                        variant="outlined"
                                    />
                                    <TextField
                                        sx={{ width: '75%', m: 1, }}
                                        id="outlined-basic"
                                        name="password2"
                                        type="password"
                                        onBlur={handleOnBlur}
                                        label="Re-type password"
                                        variant="outlined"
                                    />
                                    <Button
                                        sx={{ width: '75%', m: 1, backgroundColor: 'maroon', color: 'white' }}
                                        type="submit"
                                        variant="contained"
                                    >Register</Button>
                                </form>
                        }
                        <NavLink to="/login">
                            <Button
                                sx={{ width: '75%', m: 1, color: 'maroon' }}
                                type="submit"
                                variant="text"
                            >Already have an account? Please login</Button>
                        </NavLink>
                        <NavLink to="/" style={{ textDecoration: 'none' }}>
                            <Button
                                sx={{ width: '75%', m: 1, backgroundColor: 'maroon', color: 'white' }}
                                variant="contained"
                            >Back to home</Button>
                        </NavLink>
                    </Grid>

                    {/* login page image  */}
                    <Grid item md={7} className="login-img" style={bg}>
                        <Typography variant="h5" sx={{ color: 'warning.main' }}>
                            Exclusive Reds Collection
                        </Typography>
                        <Typography variant="h2" sx={{ color: 'white' }}>
                            Mini Matte Twilight Colors
                        </Typography>
                        <Typography paragraph width="50%" sx={{ color: 'white' }}>
                            In commodo dolor vitae sem vulputate pellentesque. Aliquam sit amet mattis Proin sed nulla mi. Curabitur commodo lectus sit amet leo dignissim.
                        </Typography>
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <Button sx={{ backgroundColor: 'white', color: 'maroon', borderRadius: '0', fontWeight: 'bold' }}> <ArrowForwardIcon /> Shop Now</Button></Link>
                    </Grid>
                </Grid>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Register;