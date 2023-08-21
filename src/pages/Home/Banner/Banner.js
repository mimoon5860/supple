import { Container, Typography } from '@mui/material';
import React from 'react';


const bannerBg = {
    background: `url(${'https://cdn.shopify.com/s/files/1/2644/9976/t/3/assets/slideshow_4.jpg?v=18103829802163136315'})`,
    // backgroundPttachment: 'fixed',
    backgroundSize: 'cover',
    // width: '100%',
    height: '400px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // backgroundColor: 'rgba(0 0 0 ,0.8)',
    // backgroundBlendMode: 'darken, luminosity',
}
const Banner = () => {
    return (
        <div style={bannerBg} >
            <Container >
                <Typography variant="h3" sx={{ textAlign: 'right', color: 'white' }}>Summer Lipstick Guide</Typography>
            </Container>
        </div>
    );
};

export default Banner;