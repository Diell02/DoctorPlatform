import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Prescription = (props) => {
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  var doctorName = "";
  var doctorSpeciality = "";
  var patientName = "";
  var patientAge = "";
  var patientGender = "";

  var date = new Date().toLocaleDateString("en-US");

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    db.collection(
      `doctors/${props.doctorUID}/patients/${props.patientUID}/prescriptions`
    )
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setPrescriptions(snapshot.docs.map((doc) => doc.data()));
      });
  }, [props.meetingID]);

  {
    doctors.map((doctor) => {
      if (doctor.uid === props.doctorUID) {
        doctorName = doctor.name;
        doctorSpeciality = doctor.medicalSpeciality;
      }
    });
  }

  {
    patients.map((patient) => {
      if (patient.uid === props.patientUID) {
        patientName = patient.name;
        patientAge = patient.age;
        patientGender = patient.gender;
      }
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadPrescription = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const date = new Date().toLocaleDateString("en-US");
    let i = pageWidth / 2;
    let j = 60;

    doc.setFillColor("#1a1a1a");
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.height, "F");

    const imgData = "/images/DocPlatform.png";
    doc.addImage(imgData, "PNG", 5, 25, 200, 15);

    doc.setTextColor("#ffffff");

    doc.setFontSize(12);
    doc.text("Date: " + date, pageWidth - 40, 10);

    doc.setFontSize(14);
    doc.text("Doctor Information", i, j, { align: "center" });
    j += 10;
    doc.autoTable({
      startY: j,
      headStyles: { fillColor: "#1a1a1a", textColor: "#ffffff", lineWidth: 0.1, lineColor: "#ffffff" },
      body: [
        ["Name", doctorName],
        ["Speciality", doctorSpeciality],
      ],
      styles: {
        cellPadding: { top: 5, right: 5, bottom: 5, left: 5 },
        fontSize: 10,
        valign: "middle",
        halign: "center",
        fillColor: "#1a1a1a",
        textColor: "#ffffff",
        fontStyle: "bold",
        lineWidth: 0.1,
        lineColor: "#ffffff",
      },
      theme: "grid",
    });
    j = doc.lastAutoTable.finalY + 20;

    doc.setFontSize(14);
    doc.text("Patient Information", i, j, { align: "center" });
    j += 10;
    doc.autoTable({
      startY: j,
      headStyles: { fillColor: "#1a1a1a", textColor: "#ffffff", lineWidth: 0.1, lineColor: "#ffffff" },
      body: [
        ["Name", patientName],
        ["Age", patientAge],
        ["Gender", patientGender],
      ],
      styles: {
        cellPadding: { top: 5, right: 5, bottom: 5, left: 5 },
        fontSize: 10,
        valign: "middle",
        halign: "center",
        fillColor: "#1a1a1a",
        textColor: "#ffffff",
        fontStyle: "bold",
        lineWidth: 0.1,
        lineColor: "#ffffff",
      },
      theme: "grid",
    });
    j = doc.lastAutoTable.finalY + 20;

    doc.setFontSize(14);
    doc.text("Prescription Information", i, j, { align: "center" });
    j += 10;

    const tableColumns = ["Prescription", "Medication", "Duration of Medication"];
    const tableData = prescriptions.map((prescript) => [
      prescript.prescription,
      prescript.medication,
      prescript.durationMed,
    ]);

    const transformedData = [];
    for (let k = 0; k < tableColumns.length; k++) {
      const column = tableColumns[k];
      const values = tableData.map((row) => row[k]);
      transformedData.push([column, ...values]);
    }

    const tableStyles = {
      cellPadding: { top: 5, right: 5, bottom: 5, left: 5 },
      fontSize: 10,
      valign: "middle",
      halign: "center",
      fillColor: "#1a1a1a",
      textColor: "#ffffff",
      fontStyle: "bold",
      lineWidth: 0.1,
      lineColor: "#ffffff",
    };

    doc.autoTable({
      startY: j,
      headStyles: { fillColor: "#1a1a1a", textColor: "#ffffff", lineWidth: 0.1, lineColor: "#ffffff" },
      body: transformedData,
      styles: tableStyles,
      theme: "grid",
    });

    doc.save("patient_prescription.pdf");
  };

  return (
    <div>

      <Tooltip title="Prescription" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MedicationIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">PRESCRIPTION</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {prescriptions.map((prescript) => {
                if (prescript.appointmentID === props.meetingID)
                  return (
                    <>
                      <ListItem style={{ margin: "0" }}>
                        <Typography>{prescript.prescription}</Typography>
                      </ListItem>
                    </>
                  );
              })}
            </List>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={downloadPrescription}
            style={{
              textTransform: "none",
              margin: "2%",
            }}
            startIcon={<DownloadIcon />}
          >
            Download Prescription
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Prescription;
