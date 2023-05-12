import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Container, List, ListItem, Typography } from "@mui/material";
import { container, listItemP, typography } from "./styles";
import Patient_List from "./patient_list";

const Your_Patients = () => {
  const [yourPatients, setYourPatients] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("doctors")
      .doc(currentUser.uid)
      .collection("patients")
      .onSnapshot((snapshot) => {
        setYourPatients(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{...container, ml:5}}>
        <Typography variant="h4" align="center" sx={typography}>
          Your Patients
        </Typography>
        <List>
          {yourPatients.map((yourPatient) => {
            {
              return (
                <ListItem sx={{...listItemP, ml:5, width: "90%"}} key={yourPatient.patientUID}>
                  <Patient_List uid={yourPatient.patientUID} />
                </ListItem>
              );
            }
          })}
        </List>
      </Container>
    </>
  );
};

export default Your_Patients;
