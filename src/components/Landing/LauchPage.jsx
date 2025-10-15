import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Launch.css";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const LaunchPage = () => {
  const navigate = useNavigate();


  return (
    <div className="body-container">
      <div className="landing-container">
        <div >
        <img src="Cognizant-Logo.png" alt="logo" className="launchPageLogo" />
        </div>
      <Typography variant="h4" align="center" fontWeight="bold">
            COGNIZANT
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              display={"inline"}
              marginLeft={"15px"}
            >
              PEGA 

              <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              display={"inline"}
              marginLeft={"15px"}
            >
              ACCELERATORS
            </Typography>
            </Typography>
      </Typography>
        <div className="buttons-container">
          <Button
            variant="contained"
            className="app-button prita"
            onClick={() => navigate("/prita")}
            sx={{ margin: 4 }}
          >
           <text> PRITA APPLICATION</text>
          </Button>
          <Button
            variant="contained"
            className="app-button pega"
            onClick={() => navigate("/pega")}
          >
           PEGA RULE VALIDATOR
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LaunchPage;
