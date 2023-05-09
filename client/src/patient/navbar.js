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
import CreateIcon from "@mui/icons-material/Create";
import Notifications from "./notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";
import VideocamIcon from "@mui/icons-material/Videocam";
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
    history.push("/#");
  };

  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("patients")
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
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>

          <ListItem button component="a" href="/patient/dashboard">
            <Tooltip title="Dashboard" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Dashboard</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patient/profile">
            <Tooltip title="Profile" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <PersonIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Profile</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patient/view_doctors">
            <Tooltip title="Book Appointment" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <CreateIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Book Appointment</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patient/notifications">
            <Tooltip title="Notifications" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <Notifications />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Notifications</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patient/scheduled_meetings">
            <Tooltip title="Scheduled Meetings" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <VideocamIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Scheduled Meetings</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patient/past_appointments">
            <Tooltip title="Past Appointments" placement="right">
              <ListItemIcon sx={listItemIcon}>
                <AssignmentIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText sx={listItemText}>Past Appointments</ListItemText>
          </ListItem>

          <ListItem button component="a" href="/patient/latest_updates">
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
  backgroundColor: "#b30000",
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
  backgroundColor: "#7f0000",
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
