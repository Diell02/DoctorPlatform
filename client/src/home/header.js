import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { box, headerBox, headerPaper, raleway, subtitle } from "./styles";

const Header = () => {
  return (
    <Paper sx={headerPaper}>
      {
        <img
          style={{ display: "none" }}
          src={process.env.PUBLIC_URL + "images/home.jpg"}
          alt="DocPlat"
        />
      }
      <Box sx={box} />

      <Grid container>
        <Grid item md={6}>
          <Box sx={headerBox}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={subtitle}
            >
              Nuk ndihesh mirë? Ke nevojë për ndihmë?
            </Typography>
            <Typography variant="h5" color="inherit" paragraph sx={raleway}>
              Vizito doktorin pa pritur në radhë, mos dil nga shtëpia kur nuk
              ndihesh mirë. Ne vijmë tek ju.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
