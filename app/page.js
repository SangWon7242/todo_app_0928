"use client";

import React, { useState } from "react";

const NewTodoForm = ({ addTodo: _addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim().length == 0) return;

    const title = newTodoTitle.trim();
    _addTodo(title);
    setNewTodoTitle("");
  };

  return (
    <form className="flex gap-[5px]" onSubmit={(e) => e.preventDefault()}>
      <input
        className="input input-bordered"
        type="text"
        value={newTodoTitle}
        placeholder="새 할일을 입력해주세요."
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addTodo}>
        할 일 추가
      </button>
    </form>
  );
};

const TodoList = ({ todos }) => {
  return <>{JSON.stringify(todos)}</>;
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (title) => {
    const id = lastTodoId + 1;

    const newTodo = {
      id,
      title,
    };

    setTodos([...todos, newTodo]);
    setLastTodoId(id);
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </>
  );
};

export default App;
