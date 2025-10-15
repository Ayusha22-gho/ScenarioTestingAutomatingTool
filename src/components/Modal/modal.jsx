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
import { JarPathContext } from "../../context/JarPathContext";


const Modal = ({
  setIsOpenConfigure,
  setIsOpen,
  configureFlag,
  handleInputChange,
  handleOkClick,
  handleCancelClick,
  inputValue,
  PRVconfigureFlag,
  setIsPRVOpenConfigure,
  isOpenPRVConfigure,
  handlePRVInputChange,
  handlePRVOkClick,
  handlePRVCancelClick,
  PRVinputValue,
}) => {
  const [selected, setSelected] = useState("");
  const [showMoreOption, setShowMoreOptions] = useState(false);
  const [childOpen, setChildOpen] = useState(true);
  const { jarPath } = useContext(JarPathContext);
  

  let navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelected(event.target.value);
    if (event.target.value === "option2") {
      setShowMoreOptions(true);
    }
  };

  const handleSubmit = () => {
    if (selected === "option1") {
      navigate("/preSIT");
    } else if (selected === "Scenariotest") {
      navigate("/SIT");
    } else if (selected === "Seleniumscripts") {
      navigate("/selenium-scripts");
    } else {
      alert("Please Select an option first");
    }
  };

  return (
    <>
      {configureFlag ? (
        <>
          <Dialog
            open={setIsOpenConfigure}
            onClose={() => setIsOpenConfigure(false)}
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
                  defaultValue={jarPath}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="PLEASE ENTER JAR PATH"
                  variant="standard"
                  value={inputValue}
                  onChange={handleInputChange}
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
                  onClick={handleOkClick}
                >
                  OK
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsOpenConfigure(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog open={setIsOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Select an option to proceed
              </Typography>
            </DialogTitle>
            <DialogContent>
              <RadioGroup value={selected} onChange={handleOptionChange}>
                <FormControlLabel
                  value="option1"
                  checked={selected === "option1"}
                  control={<Radio />}
                  label="Pega Pre-SIT Testing"
                />
                <FormControlLabel
                  value="option2"
                  checked={selected === "option2"}
                  control={<Radio />}
                  label="Pega UI Work Flow Testing"
                />
              </RadioGroup>
              {showMoreOption && (
                <Dialog open={setChildOpen} onClose={() => setChildOpen(false)}>
                  <DialogTitle>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Select the type of workflow Test
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <RadioGroup value={selected} onChange={handleOptionChange}>
                      <FormControlLabel
                        value="Scenariotest"
                        checked={selected === "Scenariotest"}
                        control={<Radio />}
                        label="Scenario Test Scripts"
                      />
                      <FormControlLabel
                        value="Seleniumscripts"
                        checked={selected === "Seleniumscripts"}
                        control={<Radio />}
                        label="Selenium Scripts"
                      />
                    </RadioGroup>

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
                        onClick={handleSubmit}
                      >
                        Proceed
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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
                  onClick={handleSubmit}
                >
                  Proceed
                </Button>
                <Button variant="outlined" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Modal;
