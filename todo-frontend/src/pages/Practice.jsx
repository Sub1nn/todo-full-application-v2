import React, { useState } from "react";

const NewComponent = () => {
  const animals = ["tiger", "cow", "elephant", "dog", "cat", "horse"];

  return (
    <div>
      <h3>Animal list</h3>
      <List animals={animals} />
    </div>
  );
};

function List({ animals }) {
  if (!animals) {
    return <div>...Loading</div>;
  }
  if (animals.length === 0) {
    return <div>There are no animals</div>;
  }
  return (
    <ul>
      {animals.map((animal) => {
        return <li key={animal}>{animal}</li>;
      })}
    </ul>
  );
}

export default NewComponent;
