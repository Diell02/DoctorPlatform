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
import { container, paper, listItem, typography } from "./styles";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleVerify = (uid) => {
    db.collection("doctors").doc(uid).update({
      isVerified: "true",
      unreadCount: 1,
      updatedAt: new Date(),
    });

    db.collection("doctors").doc(uid).collection("notifications").add({
      message: "Your profile has been verified by the admin!",
      sentAt: new Date(),
    });
  };

  const handleUnverify = (uid) => {
    db.collection("doctors").doc(uid).update({
      isVerified: "false",
      unreadCount: 1,
      updatedAt: new Date(),
    });

    db.collection("doctors").doc(uid).collection("notifications").add({
      message: "Your profile has been unverified by the admin!",
      sentAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{...container}}>
        <Grid container spacing={3} sx={{mt: 6, ml:10, bgColor: "#1a1a1a"}}>
          <Grid item xs={10}>
            <Typography variant="h5" sx={{...typography, mb:1}}>
              Unverified Doctors
            </Typography>
            <Paper sx={paper}>
              <List>
                {doctors.map((doctor) => {
                  if (doctor.isVerified === "pending")
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography sx={typography}>
                              Name: {doctor.name} <br />
                              Age: {doctor.age} years <br />
                              Gender: {doctor.gender} <br />
                              Medical Speciality: {
                                doctor.medicalSpeciality
                              }{" "}
                              <br />
                              Degree: {doctor.degree} <br />
                              Experience: {doctor.experience} years <br />
                              Reg. No.: {doctor.regNumber} <br />
                              State Medical Council:{" "}
                              {doctor.stateMedicalCouncil} <br />
                              Address: {doctor.address1}, {doctor.address2},{" "}
                              {doctor.city}, {doctor.state}, {doctor.country},{" "}
                              {doctor.pincode}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                              size="large"
                              sx={{
                                backgroundColor: "#b30000", color: "#ffffff",
                                '&:hover': {
                                  color: "#ffffff",
                                  backgroundColor: "#e61212"
                                }
                              }}
                              onClick={() => handleVerify(doctor.uid)}
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
              Verified Doctors
            </Typography>
            <Paper sx={paper}>
              <List>
                {doctors.map((doctor) => {
                  if (doctor.isVerified == "true")
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography sx={typography}>
                              Name: {doctor.name} <br />
                              Age: {doctor.age} years <br />
                              Gender: {doctor.gender} <br />
                              Medical Speciality: {
                                doctor.medicalSpeciality
                              }{" "}
                              <br />
                              Degree: {doctor.degree} <br />
                              Experience: {doctor.experience} years <br />
                              Reg. No.: {doctor.regNumber} <br />
                              State Medical Council:{" "}
                              {doctor.stateMedicalCouncil} <br />
                              Address: {doctor.address1}, {doctor.address2},{" "}
                              {doctor.city}, {doctor.state}, {doctor.country},{" "}
                              {doctor.pincode}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                              size="large"
                              sx={{
                                backgroundColor: "#b30000", color: "#ffffff",
                                '&:hover': {
                                  color: "#ffffff",
                                  backgroundColor: "#e61212"
                                }
                              }}
                              onClick={() => handleUnverify(doctor.uid)}
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

export default Doctors;
