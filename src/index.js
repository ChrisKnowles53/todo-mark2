import "./styles.css";
import { allProjects } from "./classes/project";
import Project from "./classes/project";

projectDisplay();

console.log(allProjects);
function projectDisplay() {
  const projectDiv = document.getElementById("projects");
  projectDiv.innerHTML = "";

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
}

const addProjectButton = document.getElementById("add-project");
addProjectButton.addEventListener("click", (event) => {
  console.log("add project button clicked");
  const dialog = document.querySelector("dialog");
  dialog.showModal();
});
const addProjectForm = document.getElementById("addProjectForm");
addProjectForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const addProjectForm = document.getElementById("addProjectForm");
  const dialog = document.querySelector("dialog");

  const title = document.getElementById("title").value;

  const newProject = new Project(title);
  console.log(allProjects);
  projectDisplay();
  dialog.close();
  addProjectForm.reset();
}

const addTodoButton = document.getElementById("add-todo");
addTodoButton.addEventListener("click", (event) => {
  console.log("add todo button clicked");
});
