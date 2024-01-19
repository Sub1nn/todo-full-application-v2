import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerUser = async (values) => {
    try {
      const data = await axios.post(
        "http://localhost:8000/user/register",
        values
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "female",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required("First name is required")
          .trim()
          .max(55, "First name should be max 55 chars"),
        lastName: Yup.string()
          .required("Last name is required")
          .trim()
          .max(55, "Last name should be max 55 chars"),
        email: Yup.string()
          .email()
          .required("Email is required")
          .trim()
          .lowercase(),
        password: Yup.string()
          .min(4, "Password must be at least 4 chars")
          .max(16, "Password must be at max 16 chars")
          .required(),
        gender: Yup.string().trim().oneOf(["male", "female", "other"]),
      })}
      onSubmit={(values) => registerUser(values)}
    >
      {({ handleSubmit, getFieldProps, touched, errors, setFieldValue }) => (
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
          <Typography variant="h4">Register User</Typography>
          <FormControl>
            <TextField
              label="First Name"
              variant="outlined"
              {...getFieldProps("firstName")}
            />
            {touched.firstName && errors.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
          </FormControl>
          <FormControl>
            <TextField
              label="Lat Name"
              variant="outlined"
              {...getFieldProps("lastName")}
            />
            {touched.lastName && errors.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
          </FormControl>
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
          <FormControl>
            <FormLabel
              sx={{
                textAlign: "left",
                marginBottom: "10px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                onChange={() => {
                  setFieldValue("gender", "female");
                }}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                onChange={() => {
                  setFieldValue("gender", "male");
                }}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                onChange={() => {
                  setFieldValue("gender", "other");
                }}
              />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography style={{ fontWeight: "600" }}>
              Already registered --- Login
            </Typography>
          </Link>
        </form>
      )}
    </Formik>
  );
};

export default Register;
