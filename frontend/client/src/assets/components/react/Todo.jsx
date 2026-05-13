import React from "react";

const Todo = ({ todo, deletetodo, index }) => {
  return (
    <div>
        <h2>tarea:  {todo}</h2>
        <button onClick={() => deletetodo(index)}>X</button>
    </div>
    );
};

export default Todo;