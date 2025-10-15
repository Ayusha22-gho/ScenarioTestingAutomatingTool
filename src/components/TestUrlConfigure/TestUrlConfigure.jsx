import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { SetTestUrlContext } from "../../context/SetTestUrlContext";
import BASE_URL from "../../config";


function TestUrlConfigure({ isOpen, setIsOpen }) {
  const { formData, setFormData } = useContext(SetTestUrlContext);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/v1/update-test-url`, formData )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Configure Test Url
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Configure Settings</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Test URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="User ID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        {message && <p>{message}</p>}
      </Dialog>
    </div>
  );
}

export default TestUrlConfigure;
