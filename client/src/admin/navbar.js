import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  IconButton,
  Typography,
  List,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LogoutIcon from "@mui/icons-material/Logout";
import { listItemIcon, listItemText } from "./styles.js";

const Navbar = () => {
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignout = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("admins")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setName(data.name);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser.uid]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#1a1a1a" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hello {name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <ListItemText sx={listItemText}>Tools</ListItemText>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={listItemIcon} />
            ) : (
                <ChevronLeftIcon sx={listItemIcon} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem button component="a" href="/admin/dashboard">
            <Tooltip title="Dashboard" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Dashboard</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/doctors">
            <Tooltip title="Doctors" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <MedicalServicesIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Doctors</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patients">
            <Tooltip title="Patients" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Patients</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/create_post">
            <Tooltip title="Create Post" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <PostAddIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Create Post</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/latest_updates">
            <Tooltip title="Latest Updates" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <NewspaperIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Latest Updates</ListItemText>
          </ListItem>
          
          <ListItem button onClick={handleSignout}>
            <Tooltip title="Sign Out" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <LogoutIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Sign Out</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#000000",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  backgroundColor: "#1a1a1a",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
