import * as React from "react";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { boldRaleway, buttonD, buttonP, buttonA, cardMedia, raleway } from "./styles";

const Register = () => {
  return (
    <Grid container spacing={3} id="register" sx={{ px: 2 }}>
      <Grid item xs={10} md={4}>
        <CardActionArea component="a">
          <Card sx={{ display: "flex", backgroundColor: "#C8E6C9" }}>
            <CardContent sx={{ flex: 1, fontFamily: "Raleway" }}>
              <Typography component="h1" variant="h4" sx={boldRaleway}>
                Doctor
              </Typography>
              <Typography variant="h5" paragraph sx={raleway}>
                <br />
              </Typography>
              <Button sx={buttonD} id="doctor-signup-button" href="/doctor_signup">
                Sign Up
              </Button>

              <Button sx={buttonD} href="/doctor_signin">
                Sign In
              </Button>
            </CardContent>

            <CardMedia
              component="img"
              sx={cardMedia}
              image="images/doctor.jpg"
              alt="Doctor"
            />
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={10} md={4}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex", backgroundColor: "#FFCDD2" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h1" variant="h4" sx={boldRaleway}>
                Patient
              </Typography>
              <Typography variant="h5" paragraph sx={raleway}>
                <br/>
              </Typography>
              <Button id="patient-signup-button" sx={buttonP} href="/patient_signup">
                Sign Up
              </Button>

              <Button sx={buttonP} href="/patient_signin">
                Sign In
              </Button>
            </CardContent>

            <CardMedia
              component="img"
              sx={cardMedia}
              image="images/patient.jpg"
              alt="Patient"
            />
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={10} md={4}>
        <CardActionArea component="a">
          <Card sx={{ display: "flex", backgroundColor: "#E0E0E0" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h1" variant="h4" sx={boldRaleway}>
                Admin
              </Typography>
              <Typography variant="h5" paragraph sx={raleway}>
                <br />
              </Typography>

              <Button id="admin-signin-button" sx={buttonA} href="/admin_signin">
                Sign In
              </Button>
            </CardContent>

            <CardMedia
              component="img"
              sx={cardMedia}
              image="images/admin.jpg"
              alt="Admin"
            />
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
  );
};

export default Register;
