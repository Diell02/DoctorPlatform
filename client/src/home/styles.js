// NAVBAR
export const titleToolbar = {
  borderBottom: 1,
  borderColor: "divider",
  backgroundColor: "#1a1a1a",
  color: "#cf2c2c",
};

export const title = {
  flex: 1,
  fontWeight: "bold",
  fontFamily: "Raleway",
};

export const navbarToolbar = {
  justifyContent: "space-between",
  overflowX: "hidden",
  backgroundColor: "#cf2c2c",
};

export const link = {
  pr: 16,
  pl: 16,
  pb: 1,
  pt: 1,
  flexShrink: 0,
  textDecoration: "none",
  color: "#1a1a1a",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontFamily: "Raleway",
  "&:hover": {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
  },
};

// HEADER
export const headerPaper = {
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: `url('images/home.jpg')`,
};

export const headerBox = {
  position: "relative",
  p: { xs: 3, md: 6 },
  pr: { md: 0 },
};

export const raleway = {
  fontFamily: "Raleway",
};

// REGISTER
export const buttonD = {
  backgroundColor: "#82C341",
  color: "#ffffff",
  margin: "1%",
  fontFamily: "Raleway",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#5C8B1F",
    color: "#ffffff",
  },
};

export const buttonP = {
  backgroundColor: "#FF4D4D",
  color: "#ffffff",
  margin: "1%",
  fontFamily: "Raleway",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#C40000",
    color: "#ffffff",
  },
};

export const buttonA = {
  backgroundColor: "#333333",
  color: "#ffffff",
  margin: "1%",
  fontFamily: "Raleway",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
  },
};

export const cardMedia = {
  width: 160,
  display: { xs: "none", sm: "block" },
};

export const boldRaleway = {
  fontFamily: "Raleway",
  fontWeight: "bold",
};

// ABOUT
export const description = {
  fontFamily: "Raleway",
  marginBottom: "3vh",
};

export const aboutPaper = {
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: `url('images/doctors.jpg')`,
};

export const box = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,.3)",
};

export const subtitle = {
  fontFamily: "Raleway",
  fontWeight: "bold",
  fontStyle: "italic",
};

// TESTIMONIALS
export const message = {
  pt:1,
  pb:1,
  fontFamily: "Raleway",
  fontStyle: "italic",
  color: "#ffffff",
  height: "200px",
  overflow: "hidden",
  fontSize: "17px",
};

export const testimonialsTitle = {
  fontFamily: "Raleway",
  paddingBottom: "10px",
  fontStyle: "italic",
  fontWeight: "bold",
  textAlign: "center"
};


export const card = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#1a1a1a",
};

// FOOTER
export const footerBox = {
  py: 5,
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
};

export const iconButton = {
  color: "#ffffff",
  "&:hover": { fontWeight: "bold" },
};

export const footerTitle = {
  mt: 1,
  fontFamily: "Raleway",
  fontWeight: "bold",
};

export const sendButton = {
  color: "#3284be",
  backgroundColor: "#ffffff",
  fontFamily: "Raleway",
  fontWeight: "bold",
};
