import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "../Modal/modal";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import TestUrlConfigure from "../TestUrlConfigure/TestUrlConfigure";
import Configure from "../ConfigurePath/Configure";
import { JarPathContext } from "../../context/JarPathContext";

const Item = styled(motion(Paper))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Land() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfigure, setIsOpenConfigure] = useState(false);
  const [configureIsOpen, setConfigureIsOpen] = useState(false);
  const navigate = useNavigate();

  const { jarPath, setJarPath } = useContext(JarPathContext);
  const [inputValue, setInputValue] = useState("");

  // useEffect(() => {
  //   const existingPath = localStorage.getItem("JarPath") || "";
  //   console.log("in useeffect block");
  //   setJarPath(existingPath);
  // }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOkClick = () => {
    if (inputValue.trim().length < 3) {
      alert("Please Provide New Jar Path Else Press Cancel Button");
      return;
    }
    localStorage.setItem("JarPath", inputValue);
    const testPathValue = localStorage.getItem("JarPath");
    alert("JarPath Has Been Set To: " + testPathValue);
    setJarPath(testPathValue);
    setIsOpen(false);
  };
  const handleCancelClick = () => {
    setInputValue("");
  };


    const handleHelpClick = () => {
      // Opens the PDF in a new tab
      window.open('/PRITA HandBook.pdf', '_blank');
    };
   

  return (
    <Box sx={{ flexGrow: 1}}>
      <button className="helpButton" onClick={handleHelpClick}>
     Help </button>
      <Grid container spacing={1} mt={15} alignItems={"center"}>
        <Grid item xs={12}>
          <img src="Cognizant-Logo.png" className="launchLogo" alt="logo" />
          <Typography variant="h3" align="center" fontWeight="bold">
            Pega Rule Impact
            <Typography
              variant="h3"
              align="center"
              fontWeight="bold"
              display={"inline"}
              paddingLeft={"15px"}
            >
              Test Accelerator
            </Typography>
          </Typography>
          <Typography
            align="center"
            mt={2}
            sx={{ "font-size": "40px", "font-weight": "700" }}
          >
            PRITA
          </Typography>
          <Grid container mt={2} justifyContent="center">
            <Grid item>
              <Configure
                isOpenConfigure={isOpenConfigure}
                setIsOpenConfigure={setIsOpenConfigure}
                configureFlag={true}
                handleInputChange={handleInputChange}
                handleOkClick={handleOkClick}
                handleCancelClick={handleCancelClick}
                inputValue={inputValue}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(true)}
                sx={{
                  "font-size": "16px",
                  "font-weight": "700",
                  margin: "10px",
                }}
                disabled={!jarPath}
              >
                Launch
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{ "font-size": "16px", "font-weight": "700" }}
              >
                Go Back
              </Button>
              {isOpen && <Modal setIsOpen={setIsOpen} configureFlag={false} />}
              {/* {isOpen && <NewConfigure setIsOpen ={setIsOpen}/>} */}
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid conatiner xs={6}>
          <Grid container >
            <Grid item xs={10} marginBottom={"4px"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Execute Scenarios 
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    We are reimagining renting to help you achieve your dreams
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
            <Grid item xs={10} marginLeft={"14%"} marginBottom={"10px"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Learn new skills, gain more experience
                  </Typography>
          
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={10} marginBottom={"4px"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                   Run the Impacted Rules and see reports
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    Pega Rule
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
            <Grid item xs={10} marginLeft={"14%"}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <Item>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Beautiful data representation
                  </Typography>
                  <Typography variant="body1" align="center" mt={1}>
                    Beautiful data representation built with theFront
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    mt={2}
                  >
                    Learn more
                  </Button>
                </Item>
              </motion.div>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
}
