import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../library/axios.instance";
const Login = () => {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async (values) => {
    try {
      const response = await $axios.post("/user/login", values);
      localStorage.setItem("accessToken", response?.data?.accessToken);
      localStorage.setItem("firstName", response?.data?.user?.firstName);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {error && (
        <Typography variant="h6" sx={{ color: "red" }}>
          {error}
        </Typography>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email()
            .required("Email is required")
            .trim()
            .lowercase(),
          password: Yup.string()
            .min(4, "Password must be at least 4 chars")
            .max(16, "Password must be at max 16 chars")
            .required(),
        })}
        onSubmit={async (values) => await loginUser(values)}
      >
        {({ handleSubmit, getFieldProps, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
              gap: "1.5rem",
              boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              padding: "2rem",
            }}
          >
            <Typography variant="h4">Login User</Typography>

            <FormControl>
              <TextField
                label="Email"
                variant="outlined"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email ? <div>{errors.email}</div> : null}
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password ? (
                <div>{errors.password}</div>
              ) : null}
            </FormControl>

            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Link to="/register">
              <Typography>New here? Register</Typography>
            </Link>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
