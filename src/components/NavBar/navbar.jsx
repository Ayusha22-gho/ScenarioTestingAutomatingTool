import React from "react";
import { useNavigate } from "react-router-dom";
import HouseIcon from '@mui/icons-material/House';
export default function NavBar() {
    let navigate = useNavigate();
  return (
    <div>
      <div className="sideDivider">
        <HouseIcon sx={{ fontSize: 40 ,color: "#6CB4EE" }} className="homeIcon" onClick = {()=>navigate("/prita")}/>
      </div>
    </div>
  );
}
