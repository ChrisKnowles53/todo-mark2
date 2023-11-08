import "./styles.css";
import { allProjects } from "./classes/project";
import Project from "./classes/project";
import Todo from "./classes/todo";

projectDisplay();
updateProjectDropdown();

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
  const dialog = document.getElementById("projectForm");
  dialog.showModal();
});
const addProjectForm = document.getElementById("addProjectForm");
addProjectForm.addEventListener("submit", handleProjectFormSubmit);

function handleProjectFormSubmit(event) {
  event.preventDefault();
  const addProjectForm = document.getElementById("addProjectForm");
  const dialog = document.getElementById("projectForm");

  const title = document.getElementById("title").value;

  new Project(title);
  console.log(allProjects);

  projectDisplay();
  updateProjectDropdown();
  dialog.close();
  addProjectForm.reset();
}

const addTodoButton = document.getElementById("add-todo");
addTodoButton.addEventListener("click", (event) => {
  console.log("add todo button clicked");
  const dialog = document.getElementById("todoForm");
  dialog.showModal();
});

const addTodoForm = document.getElementById("addTodoForm");
addTodoForm.addEventListener("submit", handleTodoFormSubmit);

function handleTodoFormSubmit(event) {
  event.preventDefault();
  const addTodoForm = document.getElementById("addTodoForm");
  const dialog = document.getElementById("todoForm");

  const title = document.getElementById("title1").value;
  const description = document.getElementById("description").value;
  const selectedProject = document.getElementById("projectDropdown").value;

  const newTodo = new Todo(title, description, selectedProject);
  let projectForAddingTodo = allProjects.find(
    (project) => project.name === selectedProject
  );
  if (projectForAddingTodo) {
    projectForAddingTodo.addTodo(newTodo);
  }

  projectDisplay();
  dialog.close();
  addTodoForm.reset();
}

function updateProjectDropdown() {
  const projectDropdown = document.getElementById("projectDropdown");
  projectDropdown.innerHTML = "";

  allProjects.forEach((project, index) => {
    const option = document.createElement("option");
    option.innerText = project.name;
    projectDropdown.appendChild(option);
  });
}

// thoughts if i find the project from allProjects and then apply the .todo function to that project
// Project.addTodo();
