import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Paper,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth, db } from "../firebase";
import { box, signinGrid } from "./styles";

const theme = createTheme();

const Admin_Signin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    db.collection("admins").onSnapshot((snapshot) => {
      setAdmins(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleSignin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setEmailError("All fields are required!");
    }

    {
      admins.map((admin) => {
        if (admin.email === email) {
          auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              history.push("/admin/dashboard");
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
        } else {
          setEmailError("Email is not authenticated!");
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signinGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square 
          sx={{
          bgcolor: "#898888",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "#1a1a1a" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Admin Sign In
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
                id="signin-button"
                type="submit"
                fullWidth
                sx={{
                  mt: 1, mb: 2,
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#000000",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
            
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Admin_Signin;
