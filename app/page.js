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

const TodoListItem = ({ todo, removeTodo: _removeTodo }) => {
  const [editMode, setEditMode] = useState(false);
  console.log(editMode);

  const removeTodo = () => {
    _removeTodo(todo.id);
  };

  const modifyEditMode = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  return (
    <li className="flex gap-[5px] mt-2 items-center">
      <span className="badge badge-primary badge-outline">{todo.id}</span>
      {editMode ? (
        <form className="flex gap-[5px]" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input input-bordered"
            type="text"
            placeholder="새 할일을 입력해주세요."
          />
          <button className="btn btn-outline btn-success" onClick={cancelEdit}>
            수정완료
          </button>
          <button className="btn btn-outline btn-warning" onClick={cancelEdit}>
            수정취소
          </button>
        </form>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className="btn-group flex gap-2">
            <button
              className="btn btn-outline btn-primary"
              onClick={modifyEditMode}
            >
              수정
            </button>
            <button
              className="btn btn-outline btn-secondary"
              onClick={removeTodo}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

const TodoList = ({ todos, removeTodo }) => {
  return (
    <>
      <nav className="menu-box mt-3">
        <ul>
          {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} removeTodo={removeTodo} />
          ))}
        </ul>
      </nav>
    </>
  );
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

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} />
    </>
  );
};

export default App;
