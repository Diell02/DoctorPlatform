import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import {
  Button,
  Grid,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { container, listItemR, typography, butNot } from "./styles";
import Appointments from "./appointments";
import Feedback from "./feedback";

const Past_Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    db.collection("appointments")
      .orderBy("timeSlot", "desc")
      .onSnapshot((snapshot) => {
        setAppointments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("patients")
      .doc(currentUser.uid)
      .collection("doctors")
      .onSnapshot((snapshot) => {
        setDoctors(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        <Typography variant="h4" align="center" sx={typography}>
          Past Appointments
        </Typography>
        <List>
          {appointments.map((appointment) => {
            if (
              appointment.isConfirmed === "true" &&
              appointment.patientUID === currentUser.uid
            )
              return (
                <ListItem sx={{...listItemR, ml:12}}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <b>Mode:</b> {appointment.mode} <br />
                        <b>Slot:</b>{" "}
                        {new Date(
                          appointment.timeSlot.seconds * 1000
                        ).toLocaleDateString("en-US")}
                        ,
                        {new Date(
                          appointment.timeSlot.seconds * 1000
                        ).getHours()}
                        :
                        {new Date(
                          appointment.timeSlot.seconds * 1000
                        ).getMinutes()}
                        <br />
                        <b>Symptoms:</b> {appointment.symptoms}
                      </Typography>
                      <Typography>
                        <b>Prescription: </b>
                        <Appointments
                          appointmentID={appointment.id}
                          doctorUID={appointment.doctorUID}
                          patientUID={appointment.patientUID}
                        />
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>
                        <b>Feedback: </b>
                        <Feedback
                          appointmentID={appointment.id}
                          doctorUID={appointment.doctorUID}
                          patientUID={appointment.patientUID}
                        />
                      </Typography>

                      <Button
                        sx={{ ...butNot, alignSelf: 'center', mr: 3 }}
                        href={`/doctor_profile/${appointment.doctorUID}`}
                        target="_blank"
                      >
                        See Doctor
                      </Button>
                    </Grid>

                  </Grid>
                </ListItem>
              );
          })}
        </List>
      </Container>
    </>
  );
};

export default Past_Appointments;
