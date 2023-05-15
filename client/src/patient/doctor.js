import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { db } from "../firebase";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Book_Appointment from "./book_appointment";
import { container, paperD, paperi, typography } from "./styles";
import Ratings from "../doctor/ratings";
import Reviews from "../doctor/reviews";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        {doctors.map((doctor) => {
          if (doctor.uid === uid)
            return (
              <Grid container spacing={3} sx={{ml:10}}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h4" sx={typography}>
                  Profile of Dr. {doctor.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4} lg={3} >
                  <Paper sx={paperi}>
                    <Avatar
                      alt="Doctor's Profile Picture"
                      src={doctor.imageURL}
                      sx={{ width: 150, height: 150, m: 2 }}
                    /><br/>
                    <Book_Appointment
                      doctorUID={uid}
                      startTime={doctor.startTime}
                      endTime={doctor.endTime}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paperD}>
                    <>
                      <Typography>Name: {doctor.name}</Typography>

                      <Typography>
                        Medical Speciality: {doctor.medicalSpeciality}
                      </Typography>
                      <Typography>
                        Experience: {doctor.experience} years
                      </Typography>
                      <Typography>Age: {doctor.age} years</Typography>
                      <Typography>Gender: {doctor.gender}</Typography>
                      <Typography>Degree: {doctor.degree}</Typography>
                      <Typography>
                        Address: {doctor.address1}, {doctor.address2},{" "}
                        {doctor.city}, {doctor.state}, {doctor.country},{" "}
                        {doctor.pincode}
                      </Typography>
                      <Typography>
                        Working Hours: {" "}
                        {new Date(doctor.startTime.seconds * 1000).getHours()}:
                        {new Date(doctor.startTime.seconds * 1000).getMinutes()}
                         - {new Date(doctor.endTime.seconds * 1000).getHours()}
                        :{new Date(doctor.endTime.seconds * 1000).getMinutes()}
                        hrs
                      </Typography>
                    </>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
                  <Ratings uid={doctor.uid} />
                </Grid>

                <Grid item xs={8}>
                  <Reviews uid={doctor.uid} />
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </div>
  );
};

export default Doctor;
