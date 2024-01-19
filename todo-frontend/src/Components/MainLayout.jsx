import { Container as MuiContainer } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

// MainLayout component
const MainLayout = () => {
  return (
    <div>
      <NavigationBar />
      <MuiContainer
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet /> {/* This is where the child routes will be rendered */}
      </MuiContainer>
    </div>
  );
};

export default MainLayout;
