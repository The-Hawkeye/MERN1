import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  let history = useHistory()

  let user = localStorage.getItem("username");

  const handleLogOut = ()=>{
    history.push("/");
    history.go();
    localStorage.clear();
  }
  // let user;
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>

      {hasHiddenAuthButtons ?
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
        : user ? (
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Box width={"100%"}>
          {children}
          </Box>
          <Box 
          display={"flex"}
          justifyContent={"center"}
          >
          <Avatar
          />
          {user}
          <Button
          className="explore-button"
          // startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={handleLogOut}
        >
          LogOut
        </Button>
        </Box>
        </Box>):(
        <Box>
        
          <Button
            className="explore-button"
            // startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          <Button
            className="explore-button"
            // startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => history.push("/register")}
          >
            Register
          </Button>
        </Box>
        )
      }
    </Box>
  );
};

export default Header;
