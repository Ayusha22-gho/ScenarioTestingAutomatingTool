import React, { useContext } from "react";
import Modal from "../Modal/modal";
import Button from "@mui/material/Button";

export default function Configure({
  setIsOpenConfigure,
  handleInputChange,
  handleOkClick,
  handleCancelClick,
  inputValue,
  isOpenConfigure,
}) {


  return (
    <>
      <Button
        variant="contained"
        sx={{
          "font-size": "16px",
          "font-weight": "700",
        }}
        onClick={() => setIsOpenConfigure(true)}
      >
        CONFIGURE JAR PATH
      </Button>
      {isOpenConfigure && (
        <Modal
        setIsOpenConfigure={setIsOpenConfigure}
          configureFlag={true}
          handleInputChange={handleInputChange}
          handleOkClick={handleOkClick}
          handleCancelClick={handleCancelClick}
          inputValue={inputValue}
        />
      )}
    </>
  );
}
