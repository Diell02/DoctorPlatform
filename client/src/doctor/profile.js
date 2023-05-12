import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/title";
import { container, paper, avatar, upload, paperi } from "./styles";
import Ratings from "./ratings";
import Reviews from "./reviews";

const Doctor_Profile = () => {
  const { currentUser } = useAuth();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        {doctors.map((doctor) => {
          if (doctor.uid === currentUser.uid)
            return (
              <Grid container spacing={3} sx={{ ml: 10 }}>

                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={paperi}>
                    <Title>{doctor.name}</Title>
                    <Avatar
                      alt="Doctor_Profile_Image"
                      src={`${doctor.imageURL}`}
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
                    <br />

                    <Typography>Name: {doctor.name}</Typography>
                    <Typography>
                      Medical Speciality: {doctor.medicalSpeciality}
                    </Typography>
                    <Typography>
                      Experience: {doctor.experience} years
                    </Typography>
                    <Typography>Age: {doctor.age}</Typography>
                    <Typography>Gender: {doctor.gender}</Typography>
                    <Typography>Degree: {doctor.degree}</Typography>
                    <Typography>
                      Address: {doctor.address1}, {doctor.address2},{" "}
                      {doctor.city}, {doctor.state}, {doctor.country},{" "}
                      {doctor.pincode}
                    </Typography>
                    <Typography>
                      Working Hours :{" "}
                      {new Date(doctor.startTime.seconds * 1000).getHours()}:
                      {new Date(doctor.startTime.seconds * 1000).getMinutes()}0
                      - {new Date(doctor.endTime.seconds * 1000).getHours()}:
                      {new Date(doctor.endTime.seconds * 1000).getMinutes()}0
                      hrs
                    </Typography>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="subtitle2" sx={{ alignSelf: 'flex-end' }}>
                        Last updated at:
                        {new Date(doctor.updatedAt.seconds * 1000).toLocaleDateString('en-US')}
                        ,{new Date(doctor.updatedAt.seconds * 1000).getHours()}:
                        {new Date(doctor.updatedAt.seconds * 1000).getMinutes()}
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
                  <Ratings uid={currentUser.uid} />
                </Grid>

                <Grid item xs={7}>
                  <Reviews uid={currentUser.uid} />
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Doctor_Profile;
