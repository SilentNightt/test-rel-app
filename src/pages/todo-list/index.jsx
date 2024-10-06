// components/TodoList.js
import React from "react";
import { observer } from "mobx-react-lite";
import todoStore from "../todo-list/store/TodoStore";
import "../todo-list/styles/Tode.css";

const TodoList = observer(() => {
  const [newDeal, setNewDeal] = React.useState(" ");
  const [newDate, setNewDate] = React.useState(" ");

  const addTodo = () => {
    if (newDeal && newDate) {
      todoStore.addTodoItem(newDeal, newDate);
      setNewDeal("");
      setNewDate("");
    }
  };

  const highlightEvenTodos = () => {
    const todoElements = document.querySelectorAll(".todo-item");
    todoElements.forEach((el, index) => {
      if ((index + 1) % 2 === 0) {
        el.style.backgroundColor = "lightblue";
      } else {
        el.style.backgroundColor = "";
      }
    });
  };

  const highlightOddTodos = () => {
    const todoElements = document.querySelectorAll(".todo-item");
    todoElements.forEach((el, index) => {
      if ((index + 1) % 2 !== 0) {
        el.style.backgroundColor = "lightgreen";
      } else {
        el.style.backgroundColor = "";
      }
    });
  };

  return (
    <div className="root">
      <div className="topic">
        <div className="header">
          <input
            className="deal-input"
            placeholder="Todo list"
            value={newDeal}
            onChange={(e) => setNewDeal(e.target.value)}
          />
          <input
            type="date"
            className="data-input"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div className="todo-list">
          {todoStore.todoList.map((todo, index) => (
            <div
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <div className="text">{todo.deal}</div>
              <div className="text">{todo.date}</div>
              <button
                onClick={() => todoStore.completeTodoItem(index)}
                className="complete-button"
              >
                Complete
              </button>
              <button
                onClick={() => todoStore.removeTodoItem(index)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="button-bar">
        <button onClick={addTodo} className="button-add">
          Add
        </button>
        <button
          onClick={() => todoStore.removeLastTodoItem()}
          className="button-add"
        >
          Remove Last
        </button>
        <button
          onClick={() => todoStore.removeFirstTodoItem()}
          className="button-add"
        >
          Remove First
        </button>
        <button onClick={highlightEvenTodos} className="button-add">
          Filter Even
        </button>
        <button onClick={highlightOddTodos} className="button-add">
          Filter Odd
        </button>
      </div>
    </div>
  );
});

export default TodoList;
