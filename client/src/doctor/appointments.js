import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { db } from "../firebase";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  container,
  paperA,
  listItemA,
  confirmButton,
  cancelButton,
} from "./styles";
import Title from "./dashboard/title";

const theme = createTheme();

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("appointments")
      .orderBy("timeSlot", "asc")
      .onSnapshot((snapshot) => {
        setAppointments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  const handleConfirm = (docID, patientUID) => {
    db.collection("appointments").doc(docID).update({
      isConfirmed: "true",
    });

    db.collection("doctors")
      .doc(currentUser.uid)
      .collection("patients")
      .doc(patientUID)
      .set({
        patientUID: patientUID,
      });

    db.collection("patients")
      .doc(patientUID)
      .collection("doctors")
      .doc(currentUser.uid)
      .set({
        doctorUID: currentUser.uid,
      });

    db.collection("patients").doc(patientUID).collection("notifications").add({
      message:
        "Your appointment has been confirmed! You can check its details in the scheduled meetings section.",
      sentAt: new Date(),
    });

    db.collection("patients").doc(patientUID).update({
      unreadCount: 1,
    });

    history.push("/doctor/scheduled_meetings");
  };

  const handleCancel = (docID, patientUID) => {
    db.collection("appointments").doc(docID).update({
      isConfirmed: "false",
    });

    db.collection("patients").doc(patientUID).collection("notifications").add({
      message: "Your appointment has been cancelled!",
      sentAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        <Grid container spacing={3} sx={{ml:10, mt:7}}>

          <Grid item xs={12}>
            <Title>New Appointments</Title>
            <Paper sx={paperA}>
              <List>
                {appointments.map((appointment) => {
                  if (
                    appointment.isConfirmed === "pending" &&
                    appointment.doctorUID === currentUser.uid
                  )
                    return (
                      <ListItem sx={listItemA}>
                        <Grid container>
                          <Grid item xs={12} sm={6} md={9}>
                            <Typography sx={{ml:5}}>
                              Mode: {appointment.mode} <br />
                              Slot:{" "}
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
                              Symptoms: {appointment.symptoms}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", alignItems: "center" }}>
                            <ButtonGroup
                              sx={{
                                [theme.breakpoints.down("md")]: {
                                  size: "small",
                                },
                                gap:1,
                              }}
                            >
                              <div
                                onClick={(e) =>
                                  db.doc(`meetings/${appointment.id}`).set({
                                    meetingID: appointment.id,
                                    doctorUID: appointment.doctorUID,
                                    patientUID: appointment.patientUID,
                                    scheduledAt: appointment.timeSlot,
                                    mode: appointment.mode,
                                  })
                                }
                              >
                                <Button
                                  startIcon={<DoneIcon />}
                                  sx={confirmButton}
                                  onClick={() =>
                                    handleConfirm(
                                      appointment.id,
                                      appointment.patientUID
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                              </div>

                              <Button
                                startIcon={<CloseIcon />}
                                sx={cancelButton}
                                onClick={() =>
                                  handleCancel(
                                    appointment.id,
                                    appointment.patientUID
                                  )
                                }
                              >
                                Cancel
                              </Button>
                            </ButtonGroup>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Title>Confirmed Appointments</Title>
            <Paper sx={paperA}>
              <List>
                {appointments.map((appointment) => {
                  if (
                    appointment.isConfirmed === "true" &&
                    appointment.doctorUID === currentUser.uid
                  )
                    return (
                      <ListItem sx={listItemA}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography sx={{ ml: 5 }}>
                              Mode: {appointment.mode} <br />
                              Slot:{" "}
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
                              Symptoms: {appointment.symptoms}
                            </Typography>
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

export default Appointments;
