import { todo1 } from "./todo";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
}

const myProject = new Project("Default Project");
myProject.addTodo(todo1);

export { myProject };
