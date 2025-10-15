import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./modal.css";

import { PRVJarPathContext } from "../../context/PRVJarPathContext";

export default function PRVModal({
  PRVconfigureFlag,
  setIsPRVOpenConfigure,
  isOpenPRVConfigure,
  handlePRVInputChange,
  handlePRVOkClick,
  handlePRVCancelClick,
  PRVinputValue,
}) {

    const {PRVjarPath} = useContext(PRVJarPathContext);

    const diplayPath = ()=>{
      console.log("PRVJarPath in PRV Modal",PRVjarPath)
    }
  return (
    isOpenPRVConfigure 
        && (
        <>
        <Dialog
        open={setIsPRVOpenConfigure}
        onClose={() => setIsPRVOpenConfigure(false)}
      >
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Set the path to configure file
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
          <TextField
              id="standard-basic"
              label="EXISTING JAR PATH"
              variant="standard"
              multiline
              value={PRVjarPath}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="PLEASE ENTER JAR PATH"
              variant="standard"
              value={PRVinputValue}
              onChange={handlePRVInputChange}
            />
          </div>
  
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePRVOkClick}
            >
              OK
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsPRVOpenConfigure(false)}
             
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </>)
    
  
  

)}
