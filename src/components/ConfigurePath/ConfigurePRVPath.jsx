import React from "react";

import Button from "@mui/material/Button";
import PRVModal from "../Modal/PRVModal";

export default function ConfigurePRVPath({
  isOpenPRVConfigure,
  setIsPRVOpenConfigure,
  handlePRVInputChange,
  handlePRVOkClick,
  handlePRVCancelClick,
  PRVinputValue,
  PRVconfigureFlag,
}) {

  return (
    <>
      <Button variant="contained" onClick={() => setIsPRVOpenConfigure(true)}
         sx={{
         
          "font-weight": "500",
          margin: "10px",
        }}
        >
        CONFIGURE PRV JAR PATH
      </Button>
      {isOpenPRVConfigure && (
        <PRVModal
          isOpenPRVConfigure = {isOpenPRVConfigure}
          setIsPRVOpenConfigure={setIsPRVOpenConfigure}
          PRVconfigureFlag
          handlePRVInputChange={handlePRVInputChange}
          handlePRVOkClick={handlePRVOkClick}
          handlePRVCancelClick={handlePRVCancelClick}
          PRVinputValue={PRVinputValue}
        />
      )}
    </>
  );
}
