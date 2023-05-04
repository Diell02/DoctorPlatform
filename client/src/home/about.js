import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  box,
  description,
  aboutPaper,
  subtitle,
  raleway,
  headerBox,
} from "./styles";

const About = () => {
  return (
    <div id="about">
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        align="center"
        gutterBottom
        sx={description}
      >
        DocPlat është zgjidhja për ata që duan të shmangin pritjet e gjata dhe të rezervojnë shpejt 
        takimet me mjekët më të vlerësuar në zonën e tyre. Pavarësisht nëse jeni një pacient që 
        kërkon kujdes shëndetësor cilësor ose një mjek që kërkon një mënyrë të përshtatshme për 
        t'u konsultuar me pacientët tuaj.
        <br />
        <i>
          <b> Ne kujdesemi për ju!</b>
        </i>
      </Typography>
      <Paper sx={aboutPaper}>
        {
          <img
            style={{ display: "none" }}
            src={process.env.PUBLIC_URL + "images/doctors.jpg"}
            alt="Doctors"
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
                "Profesionalizëm i Garantuar"
              </Typography>
              <Typography variant="h5" color="inherit" paragraph sx={raleway}>
                Konsultohu me doktorët më të mirë në rajon!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default About;
