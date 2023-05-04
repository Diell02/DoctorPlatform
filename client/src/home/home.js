import * as React from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import Header from "./header";
import Register from "./register";
import About from "./about";
import Testimonials from "./testimonials";
import Footer from "./footer";

const sections = [
  { title: "Home", url: "#" },
  { title: "About", url: "#about" },
  { title: "Register", url: "#register" },
  { title: "Contact", url: "#contact" },
];

const theme = createTheme();

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters maxWidth="xl" sx={{ backgroundColor: "#FFFFFF", padding: 0 }}>

        <Navbar sections={sections} />

        <main>

          <Header />

          <Register />
          <br />
          <br />

          <About />

          <Testimonials />

          <Footer />
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Home;