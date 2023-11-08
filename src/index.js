import "./styles.css";
import { myProject } from "./classes/project";

const projectDiv = document.getElementById("projects");
const todoTitleDiv = document.getElementById("todos");
const todoDescriptionDiv = document.getElementById("todo-details");

projectDiv.textContent = myProject.name;
todoTitleDiv.textContent = myProject.todos[0].title;
todoDescriptionDiv.textContent = myProject.todos[0].description;
