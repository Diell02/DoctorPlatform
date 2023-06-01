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
import firebase, { auth } from "../firebase";
import { box, signinGrid } from "./styles";

const theme = createTheme();

const Doctor_Signin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setEmailError("All fields are required!");
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/doctor/profile");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
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
      .then(() => {
        history.push("doctor/profile");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signinGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} sx={{ backgroundColor: "#a0e396" }} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "#006400" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Sign In as Doctor
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSignin}
              sx={{ mt: 1 }}
            >

              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
              />

              <Button
                type="submit"
                id="signin-button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
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
                  Sign in with Google
                </Button>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link id="signup-link" href="/doctor_signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Doctor_Signin;
