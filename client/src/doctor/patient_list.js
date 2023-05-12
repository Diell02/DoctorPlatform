import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Avatar, Button, Grid } from "@mui/material";
import Title from "./dashboard/title";

const Patient_List = (props) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {patients.map((patient) => {
        if (patient.uid === props.uid)
          return (
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={12} sm={3} md={3}>
                <Avatar
                  alt="Patient_Profile_Image"
                  src={`${patient.imageURL}`}
                  sx={{
                    ml:20,
                    width: 100,
                    height: 100,
                    border: "1px solid #ffffff",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Title>{patient.name}</Title>
              </Grid>

              <Grid item xs={12} sm={3} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  size="large"
                  variant="contained"
                  href={`/patient_profile/${props.uid}`}
                  target="_blank"
                >
                  See Profile
                </Button>
              </Grid>
            </Grid>
          );
      })}
    </>
  );
};

export default Patient_List;
