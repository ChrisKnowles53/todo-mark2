import { todo1, todo2 } from "./todo";
import {
  saveArrayToLocalStorage,
  getArrayFromLocalStorage,
} from "../localStorage";
class Project {
  static allProjects = [];

  constructor(name, todos = []) {
    this.name = name;
    this.todos = todos;
    Project.allProjects.push(this);
    Project.saveArrayToLocalStorage();
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  static saveArrayToLocalStorage() {
    saveArrayToLocalStorage("projects", Project.allProjects);
  }
}

const storedProjects = getArrayFromLocalStorage("projects");
if (storedProjects.length > 0) {
  Project.allProjects = storedProjects.map(
    (projectData) => new Project(projectData.name, projectData.todos)
  );
} else {
  const myProject = new Project("Default Project");
  const myProject2 = new Project("2nd Project");
  myProject.addTodo(todo1);
  myProject2.addTodo(todo2);
}

export const allProjects = Project.allProjects;
export default Project;
