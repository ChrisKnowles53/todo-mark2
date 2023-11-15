import { saveArrayToLocalStorage } from "./localStorage";
import { allProjects } from "./classes/project";
import { createTodoList } from "./createTodo";
import Project from "./classes/project";
import showAllToDos from "./showAll";

function projectDisplay() {
  const projectDiv = document.getElementById("projects");
  projectDiv.innerHTML = "";
  console.log(allProjects);

  allProjects.forEach((project, index) => {
    const projectContainer = createProjectContainer(project, index);
    projectDiv.appendChild(projectContainer);
  });
}

function createProjectContainer(project, index) {
  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("id", "project-container");

  const projectTitleContainer = document.createElement("div");
  projectTitleContainer.setAttribute("id", "project-title-and-button");

  const projectDivItem = document.createElement("div");
  projectDivItem.textContent = project.name;
  projectDivItem.setAttribute("id", "project-title");

  const projectDisplayButton = createProjectDisplayButton();

  const projectDeleteButton = createProjectDeleteButton(allProjects, index);

  const todoList = createTodoList(project);

  projectTitleContainer.appendChild(projectDivItem);
  projectTitleContainer.appendChild(projectDisplayButton);
  projectTitleContainer.appendChild(projectDeleteButton);
  projectContainer.appendChild(projectTitleContainer);
  projectContainer.appendChild(todoList);

  return projectContainer;
}

function createProjectDeleteButton(allProjects, projectIndex) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Project";

  deleteButton.addEventListener("click", () => {
    const confimrDelete = confirm(
      "Are you sure you want to delete this project?"
    );
    if (confimrDelete) {
      allProjects.splice(projectIndex, 1);
      saveArrayToLocalStorage("projects", allProjects);
      projectDisplay();
      showAllToDos(allProjects);
    }
  });
  return deleteButton;
}

function createProjectDisplayButton() {
  const projectDisplayButton = document.createElement("button");
  projectDisplayButton.textContent = "Show ToDo's";

  projectDisplayButton.addEventListener("click", () => {
    const projectDisplay = projectDisplayButton.parentElement;
    const todoList = projectDisplay.nextElementSibling;
    if (todoList.style.display === "none") {
      todoList.style.display = "block";
      projectDisplayButton.textContent = "Hide ToDo's";
    } else {
      todoList.style.display = "none";
      projectDisplayButton.textContent = "Show ToDo's";
    }
  });

  return projectDisplayButton;
}

function handleProjectFormSubmit(event) {
  event.preventDefault();
  const addProjectForm = document.getElementById("addProjectForm");
  const dialog = document.getElementById("projectForm");

  const title = document.getElementById("title").value;

  const newProject = new Project(title);

  projectDisplay();
  updateProjectDropdown();
  dialog.close();
  addProjectForm.reset();
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

export {
  createProjectContainer,
  createProjectDeleteButton,
  createProjectDisplayButton,
  handleProjectFormSubmit,
  updateProjectDropdown,
  projectDisplay,
};
