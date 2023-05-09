import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const container = {
  ml: 0, 
  mr: 0, 
  backgroundColor: "#0095de",
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
  mt: 10,
  p: 2,
  display: "flex",
  flexDirection: "column",
  mr: 30,
};

export const paperD = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  mr: 20,
  height: 270,
};

export const paperR = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  mr: 20,
};

export const paperi = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 270,
};

export const upload = {
  mt: 10,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const transparentPaper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  background: "transparent",
};

export const gridItem = {
  margin: "2rem 0",
};

export const uploadGridItem = {
  ...gridItem,
  [theme.breakpoints.down("sm")]: {
    order: 2,
  },
};

export const updateDetailsGridItem = {
  ...gridItem,
  [theme.breakpoints.down("sm")]: {
    order: 1,
  },
};

export const avatar = {
  width: 200,
  height: 200,
};

export const listItem = {
  border: "2px solid #b30000",
  borderRadius: "25px",
  marginTop: "2px",
  marginBottom: "2px",
  marginLeft: 12,
  width: "90%",
  boxShadow: 2,
  backgroundColor: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#b30000",
    boxShadow: 3,
    border: "3px solid #1a1a1a",
  },
};

export const listItemR = {
  border: "1px solid #1a1a1a",
  borderRadius: "25px",
  marginTop: "2px",
  marginBottom: "2px",
  width: "90%",
  boxShadow: 2,
  color: "#1a1a1a",
  backgroundColor: "#ffffff",
};

export const butNot = {
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  mb: 1,
  "&:hover": {
    backgroundColor: "#b30000",
  },
}

export const typography = { fontWeight: "bold", color: "#1a1a1a", mt:10, mb:2 };

export const typographyD = { fontWeight: "bold", color: "#1a1a1a", mt: 10 };

export const signinGrid = {
  backgroundImage: `url('images/Patient_SignIn.png')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const signupGrid = {
  backgroundImage: `url('images/Patient_Signup.png')`,
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

export const paperS = {
  backgroundColor: "#f5dede",
}

export const controls = {
  top: "auto",
  bottom: 0,
  backgroundColor: "#021117",
  alignItems: "center",
};

export const controlsToolbar = {
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "0",
    marginLeft: "0",
  },
};

export const listItemIcon = {
  color: "#fff",
};

export const listItemText = {
  color: "#fff",
};