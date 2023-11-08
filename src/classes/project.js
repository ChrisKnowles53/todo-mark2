import { todo1, todo2 } from "./todo";

class Project {
  static allProjects = [];

  constructor(name) {
    this.name = name;
    this.todos = [];
    Project.allProjects.push(this);
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
}

const myProject = new Project("Default Project");
const myProject2 = new Project("2nd Project");

myProject.addTodo(todo1);
myProject2.addTodo(todo2);

export const allProjects = Project.allProjects;
