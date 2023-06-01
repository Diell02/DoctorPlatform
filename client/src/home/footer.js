import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  footerBox,
  footerTitle,
  iconButton,
  raleway,
} from "./styles";


const Footer = () => {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box component="footer" sx={footerBox} id="contact">

      <Container maxWidth="xl">
        <Typography variant="h5" align="left" gutterBottom sx={raleway}>
          DocPlat
        </Typography>

        <Grid container>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={footerTitle}>
              Connect with us
            </Typography>

            <IconButton href="#" sx={iconButton}>
              <TwitterIcon />
            </IconButton>

            <IconButton href="#" sx={iconButton}>
              <FacebookIcon />
            </IconButton>

            <br />
          </Grid>


          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={footerTitle}>
              Contact us
            </Typography>
            <IconButton href="#" sx={iconButton}>
              <EmailIcon />
              <Typography variant="body2">
                {" "}
                docplat@gmail.com{" "}
              </Typography>
            </IconButton>
            <IconButton href="#" sx={iconButton}>
              <PhoneIcon />
              <Typography variant="body2"> +383 - 123 - 123 </Typography>
            </IconButton>
            <br/>
          </Grid>
          <Grid item xs={12} md={4}>
            <IconButton id="scrollToTopButton" onClick={handleScrollToTop} sx={{ ...iconButton, float: "right" }}>
              <ArrowUpwardIcon />
            </IconButton>
            <br />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;