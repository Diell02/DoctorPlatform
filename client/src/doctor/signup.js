import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Paper,
  Link,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import firebase, { db, auth } from "../firebase";
import { box, signupGrid } from "./styles";

const theme = createTheme();

const Doctor_Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailError("");
    if (name === "") {
      setNameError("Name is Required");
      return;
    }
    if (password !== cpassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        const user = {
          displayName: name,
          email: email,
          password: password,
          uid: cred.user.uid,
        };

        const userRef = db.doc(`users/${user.uid}`);
        userRef.set({
          name,
          email,
          createdAt: new Date(),
          uid: user.uid,
        });

        const doctorRef = db.doc(`doctors/${user.uid}`);
        doctorRef.set({
          name,
          email,
          uid: user.uid,
          imageURL: null,
          isVerified: "false",
          unreadCount: 1,
        });

        db.doc(`doctors/${cred.user.uid}`).collection("notifications").add({
          message: "Complete your profile by going to the dashboard section!",
          sentAt: new Date(),
        });
      })
      .then(() => {
        history.push(`/doctor/dashboard`);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((cred) => {

        const userRef = db.doc(`users/${cred.user.uid}`);
        userRef.set({
          name: cred.user.displayName,
          email: cred.user.email,
          createdAt: new Date(),
          uid: cred.user.uid,
        });

        const doctorRef = db.doc(`doctors/${cred.user.uid}`);
        doctorRef.set({
          name: cred.user.displayName,
          email: cred.user.email,
          uid: cred.user.uid,
          isVerified: "false",
          imageURL: null,
          unreadCount: 1,
        });

        db.doc(`doctors/${cred.user.uid}`).collection("notifications").add({
          message: "Complete your profile by going to the dashboard section!",
          sentAt: new Date(),
        });
      })
      .then(() => {
        history.push("doctor/dashboard");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signupGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} sx={{ backgroundColor: "#a0e396" }} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "#006400" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Doctor Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignup}>

              {nameError && <Alert severity="error">{nameError}</Alert>}
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              <br />

              <Grid container spacing={1}>
                <Grid item xs={12}>

                  <TextField
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    error={!!nameError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    autoComplete="confirm-password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                id="signup-button"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Sign Up
              </Button>

              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                OR
              </Typography>

              <Grid item xs={12}>
                <Button
                  variant="outline"
                  fullWidth
                  sx={{
                    mt: 1, mb: 2,
                    backgroundColor: "#FF4D4D",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#b30000",
                    },
                  }}
                  startIcon={<GoogleIcon />}
                  onClick={() => signInWithGoogle()}
                >
                  Sign up with Google
                </Button>
              </Grid>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/doctor_signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Doctor_Signup;
