import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  ListItem,
  List,
  Button,
} from "@mui/material";
import Navbar from "./navbar";
import { db } from "../firebase";
import { container, listItem, paper, typography } from "./styles";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleVerify = (uid) => {
    db.collection("patients").doc(uid).update({
      isVerified: "true",
      unreadCount: 1,
      updatedAt: new Date(),
    });

    db.collection("patients").doc(uid).collection("notifications").add({
      message: "Your profile has been verified by the admin!",
      sentAt: new Date(),
    });
  };

  const handleUnverify = (uid) => {
    db.collection("patients").doc(uid).update({
      isVerified: "false",
      unreadCount: 1,
      updatedAt: new Date(),
    });

    db.collection("patients").doc(uid).collection("notifications").add({
      message: "Your profile has been unverified by the admin!",
      sentAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        <Grid container spacing={3} sx = {{mt: 6, ml:10, bgColor: "#1a1a1a"}}>

          <Grid item xs={10}>
            <Typography variant="h5" sx={{ ...typography, mb: 1 }}>
              Unverified/New Patients
            </Typography>
            <Paper sx={paper}>
              <List>
                {patients.map((patient) => {
                  if (patient.isVerified === "false")
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography sx={{ ...typography, ml: 5 }}>
                              Email: {patient.email} <br />
                              Name: {patient.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                              variant="contained"
                              onClick={() => handleVerify(patient.uid)}
                            >
                              Verify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h5" sx={{ ...typography, mb: 1 }}>
              Verified Patients
            </Typography>
            <Paper sx={paper}>
              <List>
                {patients.map((patient) => {
                  if (patient.isVerified == "true")
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography sx={{...typography, ml:5}}>
                              Name: {patient.name} <br />
                              Age: {patient.age} <br />
                              Gender: {patient.gender} <br />
                              Blood Group: {patient.bloodGroup}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                              variant="contained"
                              onClick={() => handleUnverify(patient.uid)}
                            >
                              Unverify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patients;
