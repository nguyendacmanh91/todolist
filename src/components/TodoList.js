import React from "react";
import { useState } from "react";
import "./TodoList.css";
import { CgCloseO } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";

const TodoList = () => {
  const [listTodo, setListTodo] = useState([
    {
      id: 1,
      text: "Todo 1",
      isCompleted: true,
      isEdit: false,
    },
    {
      id: 2,
      text: "Todo 2",
      isCompleted: false,
      isEdit: false,
    },
  ]);
  const [todo, setTodo] = useState("");
  const handleSubmit = () => {
    if (todo !== "") {
      const newTodo = {
        id: Math.floor(Math.random() * 10000),
        text: todo,
        isCompleted: false,
        isEdit: false,
      };
      setListTodo([newTodo, ...listTodo]);
      setTodo("");
    } else return;
  };

  const handleComplete = (id) => {
    let updatedTodos = listTodo.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setListTodo(updatedTodos);
  };

  const handleDelete = (index) => {
    const arrTodo = [...listTodo];
    const arrUpdate = arrTodo.filter((f, i) => i !== index);
    setListTodo(arrUpdate);
  };

  const handleEdit = (id) => {
    let updatedTodos = listTodo.map((todo) => {
      if (todo.id === id) {
        todo.isEdit = !todo.isEdit;
        todo.isCompleted = false;
      }
      return todo;
    });
    setListTodo(updatedTodos);
  };

  const updateTextTodo = (text, id) => {
    let updatedTodos = listTodo.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    setListTodo(updatedTodos);
  };

  const updateTodo = (id) => {
    let updatedTodos = listTodo.map((todo) => {
      if (todo.id === id) {
        todo.isEdit = false;
      }
      return todo;
    });
    setListTodo(updatedTodos);
  };
  return (
    <>
      <div>
        <input
          className="input-text"
          type="text"
          value={todo}
          placeholder="Enter todo"
          onChange={(e) => setTodo(e.target.value)}
        ></input>
        <button className="btn-add" type="submit" onClick={handleSubmit}>
          Add Todo
        </button>
      </div>
      {listTodo.length > 0 ? (
        listTodo.map((item, index) => (
          <div
            key={index}
            className={item.isCompleted ? "todo todo-complete" : "todo"}
          >
            <div className="content">
              <input
                type="checkbox"
                checked={item.isCompleted ? "checked" : ""}
                onChange={() => handleComplete(item.id)}
              ></input>
              <label for="c1">
                <span onClick={() => handleComplete(item.id)}></span>{" "}
              </label>
              {!item.isEdit ? (
                <li onClick={() => handleComplete(item.id)}>{item.text}</li>
              ) : (
                <input
                  className="input-edit"
                  value={item.text}
                  onChange={(e) => updateTextTodo(e.target.value, item.id)}
                  onBlur={() => updateTodo(item.id)}
                />
              )}
            </div>
            <div className="icon">
              <MdModeEditOutline
                className="btn--edit"
                onClick={() => handleEdit(item.id)}
              />
              <CgCloseO
                className="btn--delete"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))
      ) : (
        <h4>Todo empty</h4>
      )}
    </>
  );
};

export default TodoList;
