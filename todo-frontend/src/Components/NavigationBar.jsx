import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logoImage from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:700px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigationItems = ["Home", "Add-Todo", "Register", "Login"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolling(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const appBarStyle = {
    position: "fixed",
    marginBottom: "40px",
    width: "100%",
    transform: scrolling ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <AppBar style={appBarStyle}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="bottom"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{ style: { backgroundColor: "lightgreen" } }}
            >
              <List>
                {navigationItems.map((item, index) => (
                  <ListItem
                    key={index}
                    component={ListItemButton}
                    onClick={() =>
                      navigate(
                        item.toLowerCase() === "home"
                          ? "/"
                          : `/${item.toLowerCase()}`
                      )
                    }
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/add-todo">
              Add-Todo
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
