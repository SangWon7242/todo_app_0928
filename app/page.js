"use client";

import React, { useState, useRef, useEffect } from "react";
import { produce } from "immer";

const NewTodoForm = ({ todoStatus }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = () => {
    if (newTodoTitle.trim().length == 0) {
      alert("할 일을 입력해주세요.");

      inputRef.current.focus();
      return;
    }

    const title = newTodoTitle.trim();
    todoStatus.addTodo(title);
    setNewTodoTitle("");

    inputRef.current.focus();
  };

  return (
    <form className="flex gap-[5px]" onSubmit={(e) => e.preventDefault()}>
      <input
        ref={inputRef}
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

const TodoListItem = ({ todo, todoStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const removeTodo = () => {
    todoStatus.removeTodo(todo.id);
  };

  const modifyTodo = () => {
    if (newTodoTitle.trim().length == 0) return;

    todoStatus.modifyTodo(todo.id, newTodoTitle.trim());
    setEditMode(false);
  };

  const modifyEditMode = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setNewTodoTitle(todo.title);
  };

  return (
    <li className="flex gap-[5px] mt-2 items-center">
      <span className="badge badge-primary badge-outline">{todo.id}</span>
      {editMode ? (
        <form className="flex gap-[5px]" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input input-bordered"
            type="text"
            value={newTodoTitle}
            placeholder="새 할일을 입력해주세요."
            onChange={(e) => {
              setNewTodoTitle(e.target.value);
            }}
          />
          <button className="btn btn-outline btn-success" onClick={modifyTodo}>
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

const TodoList = ({ todoStatus }) => {
  return (
    <>
      <nav className="menu-box mt-3">
        <ul>
          {todoStatus.todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} todoStatus={todoStatus} />
          ))}
        </ul>
      </nav>
    </>
  );
};

// 리액트 커스텀 훅
const useTodoStatus = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (title) => {
    const id = lastTodoId + 1;

    const newTodo = {
      id,
      title,
    };

    // setTodos(produce(todos, (draft) => draft.push(newTodo)));
    setTodos([...todos, newTodo]); // 기존방식
    setLastTodoId(id);
  };

  const removeTodo = (id) => {
    // setTodos(todos.filter((todo) => todo.id != id)); // 기존방식
    setTodos(
      produce(todos, (draft) => {
        const index = draft.findIndex((todo) => todo.id == id);
        draft.splice(index, 1);
      })
    ); // immer 방식
  };

  const modifyTodo = (id, title) => {
    /*
    // 일반
    const newTodos = todos.map((todo) =>
      todo.id != id ? todo : { ...todo, title }
    );
    */

    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id == id);
      draft[index].title = title;
    });

    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
  };
};

const App = () => {
  const todoStatus = useTodoStatus();

  return (
    <>
      <NewTodoForm todoStatus={todoStatus} />
      <TodoList todoStatus={todoStatus} />
    </>
  );
};

export default App;
