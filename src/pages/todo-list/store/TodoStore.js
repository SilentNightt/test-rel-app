import { makeAutoObservable } from "mobx";

class TodoStore {
  todoList = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodoItem(deal, date) {
    const newTodo = { deal, date, completed: false };
    this.todoList.push(newTodo);
  }

  removeTodoItem(index) {
    this.todoList = this.todoList.filter((_, i) => i !== index);
  }

  removeLastTodoItem() {
    if (this.todoList.length > 0) {
      this.todoList.pop();
    }
  }

  removeFirstTodoItem() {
    if (this.todoList.length > 0) {
      this.todoList.shift();
    }
  }

  completeTodoItem(index) {
    const updatedTodo = { ...this.todoList[index], completed: true };
    this.todoList = [
      ...this.todoList.slice(0, index),
      ...this.todoList.slice(index + 1),
      updatedTodo,
    ].sort((a, b) => a.completed - b.completed);
  }

  updateTodoItem(index, newDeal, newDate) {
    this.todoList[index] = {
      ...this.todoList[index],
      deal: newDeal,
      date: newDate,
    };
  }
}

const todoStore = new TodoStore();
export default todoStore;
