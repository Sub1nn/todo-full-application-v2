import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const MainLayout = () => {
  return (
    <div>
      <NavigationBar />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
