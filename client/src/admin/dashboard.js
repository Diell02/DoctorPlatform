import React from "react";
import { Grid, Paper, Container, Typography } from "@mui/material";
import Navbar from "./navbar";
import { container, paper, typography } from "./styles";

const Admin_Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        <Grid container spacing={3} justifyContent="center" sx={{mt: 8}}>
          <Grid item xs={10}>
            <Typography variant="h4" align="center" sx={typography}>
              ADMIN DASHBOARD
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Paper sx={paper}>
              <Typography variant="h6">
                <b>Verify Doctors who are on <span style={{ color: 'red' }}>pending</span> status.</b>
                <br />
                <br />
                <b>Verify Patients who are on <span style={{ color: 'red' }}>pending</span> status.</b>
                <br />
                <br />
                <b>Create Posts for new Features/Updates.</b>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Admin_Dashboard;
