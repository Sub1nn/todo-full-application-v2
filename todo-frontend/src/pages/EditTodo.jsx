import React from "react";
import { useMutation, useQuery } from "react-query";
import $axios from "../library/axios.instance";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const EditTodo = () => {
  const params = useParams();
  const navigate = useNavigate();
  // get todo details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todo-details"],
    queryFn: async () => {
      return await $axios.get(`/todo/details/${params.id}`);
    },
  });

  //update todo
  const { mutate, isLoading: updateTodoLoading } = useMutation({
    mutationKey: ["update-todo"],
    mutationFn: async (newValues) => {
      return await $axios.put(`/todo/update/${params.id}`, newValues);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const todoDetails = data?.data;

  if (isLoading || updateTodoLoading) {
    return <CircularProgress />;
  }
  const currentDate = dayjs().startOf("day");

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: todoDetails?.title || "",
          description: todoDetails?.description || "",
          date: todoDetails?.date || "",
        }}
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
            <Typography variant="h4">Update Todos</Typography>
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
                  defaultValue={dayjs(todoDetails?.date)}
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
              Edit Todo
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditTodo;
