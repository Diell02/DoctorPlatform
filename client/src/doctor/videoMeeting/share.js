import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IconButton,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
  Typography,
  Tooltip,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";

const Share = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const url = window.location.href;


  const location = useLocation();
  const meetingCode = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );


  return (
    <div>

      <Tooltip title="Share Meeting Info" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <ShareIcon />
        </IconButton>
      </Tooltip>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Share Meeting Information
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Copy meeting url:
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Share;
