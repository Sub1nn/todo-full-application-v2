import React, { useState, useEffect } from "react";
import axios from "axios";

const NewComponent = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div>
      <button
        onClick={() => {
          setSelectedId(1);
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setSelectedId(2);
        }}
      >
        2
      </button>
      <button
        onClick={() => {
          setSelectedId(3);
        }}
      >
        3
      </button>
      <button
        onClick={() => {
          setSelectedId(4);
        }}
      >
        4
      </button>
      <Todo id={selectedId} />
    </div>
  );
};

function Todo({ id }) {
  const [todo, setTodo] = useState({});

  // useEffect(() => {
  //   axios
  //     .get(`https://sum-server.100xdevs.com/todo?id=${id}`)
  //     .then((response) => {
  //       setTodo(response.data.todo);
  //     });
  // }, [id]);

  //if you want the api to render after 5 seconds after clicking the button, you can simply put the axios inside a serTimeout Function
  setTimeout(() => {
    axios
      .get(`https://sum-server.100xdevs.com/todo?id=${id}`)
      .then((response) => {
        setTodo(response.data.todo);
      });
  }, 5000);
  return (
    <>
      <h1>{todo.title}</h1>
      <h4>{todo.description}</h4>
    </>
  );
}

export default NewComponent;
