import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar";
import Form from "./form";
import Upload from "./upload";
import { container, paper, upload, uploadGridItem, updateDetailsGridItem } from "../styles";


const Patient_Dashboard = () => {
  const { currentUser } = useAuth();

  return (
      <>
        <Navbar />
        <Container maxWidth="xl" sx={container}>
        <Grid container spacing={3} justifyContent="center" sx={{ flexWrap: 'nowrap', ml: 6 }} id="dashboard-container">
          <Grid item sx={{ ...uploadGridItem, display: 'flex', justifyContent: 'flex-end', ml:6 }}>
              <Paper sx={upload}>
                <Upload uid={currentUser.uid} />
              </Paper>
            </Grid>

          <Grid item sx={{ ...updateDetailsGridItem, display: 'flex', justifyContent: 'flex-start', ml:6 }}>
              <Paper sx={paper}>
                <Form uid={currentUser.uid} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
  );
};

export default Patient_Dashboard;
