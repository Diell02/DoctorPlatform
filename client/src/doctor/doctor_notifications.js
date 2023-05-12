import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Button, Container, List, ListItem, Typography } from "@mui/material";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import { container, listItemA, typography, butNot } from "./styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const Doctor_Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("doctors")
      .doc(currentUser.uid)
      .collection("notifications")
      .orderBy("sentAt", "desc")
      .onSnapshot((snapshot) => {
        setNotifications(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const handleReadNotifications = () => {
    db.collection("doctors").doc(currentUser.uid).update({
      unreadCount: 0,
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={container}>
        <Typography variant="h4" align="center" sx={typography}>
          Notifications
        </Typography>
        <Button
          size="large"
          sx={{ ...butNot, ml: 14, mb: 1 }}
          startIcon={<MarkChatReadIcon />}
          onClick={handleReadNotifications}
        >
          Mark as read
        </Button>
        <List>
          {notifications.map((notification) => {
            return (
              <ListItem sx={{...listItemA, ml:10, width:"90%"}}>
                <Typography>
                  {notification.message} <br />{" "}
                  {new Date(
                    notification.sentAt.seconds * 1000
                  ).toLocaleDateString("en-US")}
                  ,{new Date(notification.sentAt.seconds * 1000).getHours()}:
                  {new Date(notification.sentAt.seconds * 1000).getMinutes()}
                  <br />
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default Doctor_Notifications;
