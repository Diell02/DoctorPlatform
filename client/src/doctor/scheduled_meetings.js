import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";
import { db } from "../firebase";
import { container, listItemA, butNot } from "./styles";

const Doctor_Schedule_Meeting = () => {
  const history = useHistory();
  const [meetings, setMeetings] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("meetings")
      .orderBy("scheduledAt", "desc")
      .onSnapshot((snapshot) => {
        setMeetings(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const create = () => {
    const id = uuid();

    history.push(`/doctor/room/${id}`);
    alert(`Copy your meeting code : ${id}`);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        <Grid sx={{ml:10, mt:10}}>
          <Button onClick={create} size="large"
            sx={{ ...butNot, ml: 10, mb: 1 }} target="_blank">
          Meet
        </Button>
        <List>
          {meetings.map((meeting) => {
            if (meeting.doctorUID === currentUser.uid)
              return (
                <ListItem sx={listItemA}>
                  <Grid container spacing={3} sx={{ml:5}}>
                    <Grid item xs={12} sm={9}>
                      <Typography>
                        Meeting ID: {meeting.meetingID} <br />
                        Scheduled At:{" "}
                        {new Date(
                          meeting.scheduledAt.seconds * 1000
                        ).toLocaleDateString("en-US")}
                        ,
                        {new Date(
                          meeting.scheduledAt.seconds * 1000
                        ).getHours()}
                        :
                        {new Date(
                          meeting.scheduledAt.seconds * 1000
                        ).getMinutes()}
                        <br />
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        size="large"
                        target="_blank"
                        href={`/doctor/room/${meeting.meetingID}`}
                      >
                        Join Appointment
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              );
          })}
        </List>
        </Grid>
      </Container>
    </>
  );
};

export default Doctor_Schedule_Meeting;
