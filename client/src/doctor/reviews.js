import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { List, ListItem, Paper, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { listItemRat, paperR } from "../patient/styles";
import Title from "./dashboard/title";

const Reviews = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    db.collection("doctors")
      .doc(props.uid)
      .collection("feedbacks")
      .onSnapshot((snapshot) => {
        setFeedbacks(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <Paper>
      <Title>Patient Reviews</Title>
      <List>
        {feedbacks.map((feedback) => {
          return (
            <ListItem sx={listItemRat}>
              <ArrowRightIcon />
              <Typography>{feedback.review}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default Reviews;
