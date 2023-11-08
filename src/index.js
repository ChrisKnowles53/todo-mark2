import "./styles.css";
import { allProjects } from "./classes/project";

console.log(allProjects);

const projectDiv = document.getElementById("projects");

allProjects.forEach((project) => {
  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("id", "project-container");

  const projectDivItem = document.createElement("div");
  projectDivItem.textContent = project.name;

  const todoList = document.createElement("ul");

  project.todos.forEach((todo) => {
    const todoListItem = document.createElement("li");

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todo.title;

    const todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description;

    todoListItem.appendChild(todoTitle);
    todoListItem.appendChild(todoDescription);

    todoList.appendChild(todoListItem);
  });
  projectContainer.appendChild(projectDivItem);
  projectContainer.appendChild(todoList);

  projectDiv.appendChild(projectContainer);
});
