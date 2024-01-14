import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import { FormControl, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const AddTodo = () => {
  const currentDate = dayjs().startOf("day");
  return (
    <Formik
      initialValues={{ title: "", description: "", date: "" }}
      validationSchema={Yup.object({
        title: Yup.string().max(20).trim().required(),
        description: Yup.string().required().trim().max(55),
        date: Yup.date().min(currentDate).required(),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit, getFieldProps, touched, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              label="Title"
              variant="outlined"
              {...getFieldProps("title")}
            />
            {touched.title && errors.title ? <div>{errors.title}</div> : null}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Description"
              variant="outlined"
              {...getFieldProps("description")}
            />
            {touched.description && errors.description ? (
              <div>{errors.description}</div>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  onChange={(value) => {
                    const dateValue = dayjs(value).format("YYYY-MM-DD");
                    setFieldValue("date", dateValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {touched.date && errors.date ? <div>{errors.date}</div> : null}
          </FormControl>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};

export default AddTodo;
