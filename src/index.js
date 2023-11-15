import "./styles.css";
import { allProjects } from "./classes/project";
import showAllToDos from "./showAll";
import {
  handleProjectFormSubmit,
  updateProjectDropdown,
  projectDisplay,
} from "./createProject";
import { handleTodoFormSubmit } from "./createTodo";

projectDisplay();
updateProjectDropdown();
createAddTodoButton();
createShowAllTodoButton();
createProjectButton();

function createProjectButton() {
  const addProjectButton = document.getElementById("add-project");
  addProjectButton.addEventListener("click", (event) => {
    const dialog = document.getElementById("projectForm");
    dialog.showModal();
  });
  const addProjectForm = document.getElementById("addProjectForm");
  addProjectForm.addEventListener("submit", handleProjectFormSubmit);
}

function createAddTodoButton() {
  const addTodoButton = document.getElementById("add-todo");
  addTodoButton.addEventListener("click", (event) => {
    const dialog = document.getElementById("todoForm");
    dialog.showModal();
  });

  const addTodoForm = document.getElementById("addTodoForm");
  addTodoForm.addEventListener("submit", handleTodoFormSubmit);
}
function createShowAllTodoButton() {
  const showButton = document.getElementById("show-all-todos");
  const allTodosDiv = document.getElementById("todos-display");
  allTodosDiv.style.display = "none";
  showButton.addEventListener("click", () => {
    if (allTodosDiv.style.display === "none") {
      showButton.textContent = "Hide All Todos";
      allTodosDiv.style.display = "block";
      showAllToDos(allProjects);
    } else {
      showButton.textContent = "Show All Todo's";
      allTodosDiv.style.display = "none";
    }
  });
}
