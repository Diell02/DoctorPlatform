import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const container = {
  ml: 0,
  mr: 0,
  backgroundColor: "#595757",
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  [theme.breakpoints.down("md")]: {
    mt: "10vh",
    ml: "10vw",
    maxWidth: "95vw",
  },
  [theme.breakpoints.down("sm")]: {
    ml: "12vw",
    maxWidth: "85vw",
  },
};
export const paper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "transparent",
};

export const listItem = {
  border: "1px solid #1a1a1a",
  borderRadius: "25px",
  margin: "2px",
  boxShadow: 2,
  backgroundColor: "#595757",
  "&:hover": {
    backgroundColor: "#1a1a1a",
    boxShadow: 3,
    border: "2px solid #595757",
  },
};

export const typography = { fontWeight: "bold", color: "#ffffff" };

export const signinGrid = {
  backgroundImage: `url('images/Admin_SignIn.png')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const box = {
  my: 8,
  mx: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const listItemText = {
  color: "#fff",
};

export const listItemIcon = {
  color: "#fff",
};
