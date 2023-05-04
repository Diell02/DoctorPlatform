import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { card, message, testimonialsTitle } from "./styles";

const theme = createTheme();

const Testimonials = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3" sx={testimonialsTitle}>
            Testimonials
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardMedia
                  component="img"
                  image="images/billgates.jpg"
                  alt="random"
                  sx={{ height: "350px" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={message}
                  >
                    "Unë rekomandoj DocPlat për këdo që kërkon një platformë 
                    të kujdesit shëndetësor të besueshëm dhe miqësor ndaj përdoruesit"
                  </Typography>
                  <div style={{ display: "flex" }}>
                  <Typography variant="h6" style={{ color: "#cf2c2c" }}>- Bill</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardMedia
                  component="img"
                  image="images/elonmusk.jpg"
                  alt="random"
                  sx={{ height: "350px" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={message}
                  >
                    "Ndihesha i humbur dhe i mbingarkuar me problemet e mia shëndetësore, 
                    por DocPlat më lidhi me një mjek të shkëlqyer që u kujdes për mua."
                  </Typography>
                  <div style={{ display: "flex" }}>
                  <Typography variant="h6" style={{ color: "#cf2c2c" }}>- Elon</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardMedia
                  component="img"
                  image="images/warrenbuffet.jpg"
                  alt="random"
                  sx={{ height: "350px" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={message}
                  >
                    "DocPlat e ka bërë shumë më të lehtë rezervimin e takimeve me mjekun tim.
                     Më pëlqen komoditeti që ofron!"
                  </Typography>
                  <div style={{ display: "flex" }}>
                  <Typography variant="h6" style={{ color: "#cf2c2c" }}>- Warren</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Testimonials;
