import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import $axios from "../library/axios.instance.js";

const Home = () => {
  const { isLoading, isError, error, data } = useQuery(
    ["todo-list"],
    async () => {
      return await $axios.post("/todo/list", {
        page: 1,
        limit: 5,
      });
    }
  );
  const todoList = data?.data;

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  if (isError) {
    return (
      <Typography variant="h5">{error || "Something went wrong."}</Typography>
    );
  }

  return (
    <>
      <Button>Add todo</Button>
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
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
            >
              <Typography variant="h5" sx={{ color: "green" }}>
                {item?.title}
              </Typography>
              <Typography>{item?.description}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
