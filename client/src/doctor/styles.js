import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const container = {
  ml: 0,
  mr: 0,
  backgroundColor: "#D4AF37",
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

export const paperA = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  mr: 30,
};

export const paperi = {
  mt: 10,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 330,
};

export const transparentPaper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  background: "transparent",
};


export const upload = {
  mt: 10,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const avatar = {
  width: 200,
  height: 200,
};

export const listItem = {
  border: "2px solid #0d7da5",
  borderRadius: "25px",
  margin: "2px",
  boxShadow: 2,
  backgroundColor: "#e6f7fd",
  "&:hover": {
    backgroundColor: "#d0f0fb",
    boxShadow: 3,
    border: "3px solid #0d7da5",
  },
};

export const listItemA = {
  border: "1px solid #1a1a1a",
  color: "#ffffff",
  borderRadius: "25px",
  margin: "2px",
  boxShadow: 1,
  backgroundColor: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#000000",
    boxShadow: 2,
    border: "2px solid #000000",
  },
};

export const listItemP = {
  border: "1px solid #1a1a1a",
  color: "#ffffff",
  borderRadius: "25px",
  margin: "2px",
  boxShadow: 1,
  backgroundColor: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#000000",
    boxShadow: 2,
    border: "2px solid #000000",
  },
};

export const typography = { fontWeight: "bold", color: "#1a1a1a", mt:10, mb:2 };

export const confirmButton = {
  backgroundColor: "#009900",
  "&:hover": {
    backgroundColor: "#006600",
  },
  color: "#ffffff",
};

export const cancelButton = {
  backgroundColor: "#e60000",
  "&:hover": {
    backgroundColor: "#b30000",
  },
  color: "#ffffff",
};

export const signinGrid = {
  backgroundImage: `url('images/Doctor_SignIn.png')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const signupGrid = {
  backgroundImage: `url("images/Doctor_SignUp.png")`,
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

export const listItemText = {
  color: "#fff",
};

export const listItemIcon = {
  color: "#fff",
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

export const butNot = {
  backgroundColor: "#006400",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#b30000",
  },
};