import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  ButtonGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import $axios from "../library/axios.instance.js";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaEdit } from "react-icons/fa";
import Popover from "@mui/material/Popover";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [todoId, setTodoId] = useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery(
    ["todo-list"],
    async () => {
      return await $axios.post("/todo/list", {
        page: 1,
        limit: 25,
      });
    }
  );

  const {
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
    data: deleteData,
    mutate: deleteTodo,
  } = useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: async () => {
      return $axios.delete(`/todo/delete/${todoId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todo-list");
    },
  });

  const todoList = data?.data;

  if (isLoading || deleteLoading) {
    return <CircularProgress color="secondary" />;
  }

  if (isError || deleteIsError) {
    return (
      <Typography variant="h5">{error || "Something went wrong."}</Typography>
    );
  }

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, color: "purple" }}>
          Are you sure you want to delete?
        </Typography>
        <Stack direction="row" justifyContent="space-between" m=".5rem">
          <Button
            variant="contained"
            color="error"
            sx={{ "&:focus": { outline: "none" } }}
            onClick={() => {
              deleteTodo();
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ "&:focus": { outline: "none" } }}
            onClick={handleClose}
          >
            No
          </Button>
        </Stack>
      </Popover>
      <h2
        style={{
          color: "#121212",
          fontFamily: "Trebuchet MS, sans-serif",
          fontSize: "3rem",
          marginBottom: "3rem",
          textShadow:
            "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
        }}
      >
        My Todos
      </h2>
      <Grid
        container
        sx={{
          mt: "2rem",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {todoList.map((item) => {
          return (
            <Grid
              xs={8}
              sm={6}
              lg={4}
              item
              key={item._id}
              sx={{
                borderRadius: "10px",
                mb: "2rem",
                padding: "2rem",
                minWidth: "300px",

                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "bb3e03",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                {item?.title}
              </Typography>
              <Typography sx={{ fontWeight: 550 }}>
                {item?.description}
              </Typography>

              <ButtonGroup
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                // variant="contained"
                aria-label="outlined primary button group"
              >
                <IconButton
                  aria-label="delete"
                  color="error"
                  sx={{ "&:focus": { outline: "none" } }}
                  onClick={(event) => {
                    openPopover(event);
                    setTodoId(item._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="success"
                  sx={{ "&:focus": { outline: "none" } }}
                  onClick={() => {}}
                >
                  <FaEdit />
                </IconButton>
              </ButtonGroup>
            </Grid>
          );
        })}
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/add-todo");
        }}
      >
        Add todo
      </Button>
    </>
  );
};

export default Home;
