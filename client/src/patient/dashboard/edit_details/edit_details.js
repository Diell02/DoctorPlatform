import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../title";
import Name from "./name";
import Gender from "./gender";
import Age from "./age";
import BloodGroup from "./bloodGroup";
import Address from "./address";

const theme = createTheme();

const Edit_Details = (props) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {patients.map((patient) => {
          if (patient.uid === props.uid)
            return (
              <Grid container spacing={1} key={patient.uid}>
                <Grid item xs={12}>
                  <Title>You Are Verified!</Title>
                </Grid>
                
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Name: {patient.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Name uid={patient.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Gender: {patient.gender}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Gender uid={patient.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Age: {patient.age}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Age uid={patient.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Blood Group: {patient.bloodGroup}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <BloodGroup uid={patient.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Address: {patient.address1}, {patient.address2},
                        <br />
                        {patient.city}, {patient.state}, {patient.country},{" "}
                        {patient.pincode}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Address uid={patient.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <br /><br /><br /><br /><br /><br />
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="subtitle2" sx={{ alignSelf: 'flex-end' }}>
                    Last updated at:
                    {new Date(patient.updatedAt.seconds * 1000).toLocaleDateString('en-US')}
                    ,{new Date(patient.updatedAt.seconds * 1000).getHours()}:
                    {new Date(patient.updatedAt.seconds * 1000).getMinutes()}
                  </Typography>
                </Grid>

              </Grid>
            );
        })}
      </Box>
    </ThemeProvider>
  );
};
export default Edit_Details;
