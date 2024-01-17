import { Button, FormControl, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import $axios from "../library/axios.instance";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data, mutate } = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: async (values) => {
      return await $axios.post("/todo/add", values);
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  console.log(data, isLoading, isError);
  const currentDate = dayjs().startOf("day");
  return (
    <>
      <Formik
        initialValues={{ title: "", description: "", date: "" }}
        validationSchema={Yup.object({
          title: Yup.string().max(20).trim().required(),
          description: Yup.string().required().trim().max(55),
          date: Yup.date().min(currentDate).required(),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
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
            <Typography variant="h4">Create Todos</Typography>
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
                multiline
                rows={4}
                {...getFieldProps("description")}
              />
              {touched.description && errors.description ? (
                <div>{errors.description}</div>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  onChange={(value) => {
                    const dateValue = dayjs(value).format("YYYY-MM-DD");
                    setFieldValue("date", dateValue);
                  }}
                />
              </LocalizationProvider>
              {touched.date && errors.date ? <div>{errors.date}</div> : null}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              Add Todo
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddTodo;
