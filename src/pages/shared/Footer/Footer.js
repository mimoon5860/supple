import React from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Box } from "@mui/system";
import "./Footer.css";
const Footer = () => {
  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Box className="footer">
        <div className="footer-help">
          <div>
            <div>
              <h3>Collection</h3>
              <p>Rare beauty</p>
              <p>Mac</p>
              <p>Lo'real</p>
              <p>Flormar</p>
              <p>Revlon</p>
            </div>
          </div>
          <div>
            <h3>Support</h3>
            <p>Home Delivery</p>
            <p>On Show room</p>
            <p>Store Location</p>
            <p>Discount</p>
            <p>Seasonal Discount</p>
          </div>
        </div>

        <div style={{ textAlign: "start" }}>
          <h3>Contact us</h3>
          <p style={{ display: "flex", alignItems: "center" }}>
            <LocationOnRoundedIcon />
            <span style={{ marginLeft: "5px" }}>
              {" "}
              1203 Town Center Drive FL 33458 USA
            </span>
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <CallRoundedIcon />
            <span style={{ marginLeft: "5px" }}> +841 123 456 78</span>
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <MailOutlineRoundedIcon />{" "}
            <span style={{ marginLeft: "5px" }}>info@lindashop.com</span>
          </p>
          <p>
            <FacebookRoundedIcon /> <MailOutlineRoundedIcon />{" "}
          </p>
        </div>
      </Box>
      <div
        style={{
          backgroundColor: "black",
          color: "gray",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Copyright © 2023, Supple Smile Powered by Shopify
      </div>
    </div>
  );
};

export default Footer;
