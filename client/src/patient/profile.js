import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/title";
import { container, paper, avatar, upload } from "./styles";
import BPGraph from "./bpGraph";
import WeightGraph from "./weightGraph";

const Patient_Profile = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        {patients.map((patient) => {
          if (patient.uid === currentUser.uid)
            return (
              <Grid container spacing={3} sx={{ ml: 12 }}>

                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={upload}>
                    <Title>{patient.name}</Title>
                    <Avatar
                      alt="Patient_Profile_Image"
                      src={`${patient.imageURL}`}
                      sx={avatar}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <Title>Profile</Title>
                    <Typography sx={{ fontStyle: "italic" }}>
                      (Edit in Dashboard)
                    </Typography>
                    <Typography>Name: {patient.name}</Typography>
                    <Typography>Age: {patient.age}</Typography>
                    <Typography>Gender: {patient.gender}</Typography>
                    <Typography>Blood Group: {patient.bloodGroup}</Typography>
                    <Typography>
                      Address: {patient.address1}, {patient.address2},{" "}
                      {patient.city}, {patient.state}, {patient.country}
                    </Typography>
                    <Typography>Zip Code: {patient.pincode}</Typography>
                    <Typography variant="subtitle2">
                      Last updated at:{" "}
                      {new Date(
                        patient.updatedAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      , {" "}
                      {new Date(patient.updatedAt.seconds * 1000).getHours()}:
                      {new Date(patient.updatedAt.seconds * 1000).getMinutes()}{" "}
                      hrs
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={5}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 255,
                    }}
                  >
                    <BPGraph uid={patient.uid} />
                  </Paper>
                </Grid>

                <Grid item xs={5}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 255,
                    }}
                  >
                    <WeightGraph uid={patient.uid} />
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Patient_Profile;
