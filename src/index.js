import "./styles.css";
import { allProjects } from "./classes/project";
import Project from "./classes/project";
import Todo from "./classes/todo";
import dateFormat from "./datefns";

projectDisplay();
updateProjectDropdown();

function createProjectContainer(project) {
  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("id", "project-container");

  const projectTitleContainer = document.createElement("div");
  projectTitleContainer.setAttribute("id", "project-title-and-button");

  const projectDivItem = document.createElement("div");
  projectDivItem.textContent = project.name;

  const projectDisplayButton = createProjectDisplayButton();

  const todoList = createTodoList(project);

  projectTitleContainer.appendChild(projectDivItem);
  projectTitleContainer.appendChild(projectDisplayButton);
  projectContainer.appendChild(projectTitleContainer);
  projectContainer.appendChild(todoList);

  return projectContainer;
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
      projectDisplayButton.textContent = "Show Todo's";
    }
  });

  return projectDisplayButton;
}

function createTodoList(project) {
  const todoList = document.createElement("ul");
  todoList.style.display = "none";

  project.todos.forEach((todo, index) => {
    const todoListItem = createTodoListItem(todo, index, project);
    todoList.appendChild(todoListItem);
  });
  return todoList;
}

function createTodoListItem(todo, index, project) {
  const todoListItem = document.createElement("li");

  const todoTitleContainer = document.createElement("p");
  todoTitleContainer.setAttribute("id", "todo-title-and-button");

  const todoTitle = document.createElement("p");
  todoTitle.textContent = todo.title;

  const listItemButton = createListItemButton(index, todoListItem);

  todoTitleContainer.appendChild(todoTitle);
  todoTitleContainer.appendChild(listItemButton);

  const todoDescription = createTodoDescription(
    todo.description,
    project,
    index,
    todo
  );

  todoListItem.appendChild(todoTitleContainer);
  todoListItem.appendChild(todoDescription);

  return todoListItem;
}

function createListItemButton() {
  const listItemButton = document.createElement("button");
  listItemButton.setAttribute("id", "more-button");
  listItemButton.textContent = "More";

  listItemButton.addEventListener("click", () => {
    const listItem = listItemButton.parentElement;
    const todoDescription = listItem.nextElementSibling;

    if (todoDescription.style.display === "none") {
      todoDescription.style.display = "block";
      listItemButton.textContent = "Less";
    } else {
      todoDescription.style.display = "none";
      listItemButton.textContent = "More";
    }
  });
  return listItemButton;
}

function createTodoDescription(description, project, index, todo) {
  const todoDescription = document.createElement("p");
  const displayedDueDate = dateFormat(todo.date);
  todoDescription.classList.add("todo-description");
  todoDescription.innerHTML = `${description} <br> Due by ${displayedDueDate}`;
  todoDescription.style.display = "none";
  const deleteButton = createDeleteButton(project, index);
  const editButton = createEditButton(todo, index);

  todoDescription.appendChild(deleteButton);
  todoDescription.appendChild(editButton);

  return todoDescription;
}

function createEditButton(todo, index) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.dataset.todoIndex = index;

  editButton.addEventListener("click", () => {
    const dialog = document.getElementById("editForm");
    const titleInput = document.getElementById("edit-title");
    const descriptionInput = document.getElementById("edit-description");
    const dateInput = document.getElementById("edit-due-date");
    const saveButton = document.getElementById("save");

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dateInput.value = todo.date;

    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      const updatedTitle = titleInput.value;
      const todoIndex = editButton.dataset.todoIndex;
      const updatedDescription = descriptionInput.value;
      const updatedDate = dateInput.value;
      const selectedProject = todo.project;

      const projectForUpdatingTodo = allProjects.find(
        (project) => project.name === selectedProject
      );

      if (projectForUpdatingTodo && todoIndex !== undefined) {
        const todoToUpdate = projectForUpdatingTodo.todos[todoIndex];
        todoToUpdate.title = updatedTitle;
        todoToUpdate.description = updatedDescription;
        todoToUpdate.date = updatedDate;
        projectDisplay();
      }

      dialog.close();
    });

    dialog.showModal();
  });

  return editButton;
}

function projectDisplay() {
  const projectDiv = document.getElementById("projects");
  projectDiv.innerHTML = "";

  allProjects.forEach((project) => {
    const projectContainer = createProjectContainer(project);
    projectDiv.appendChild(projectContainer);
  });
  console.log(allProjects);
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

  projectDisplay();
  updateProjectDropdown();
  dialog.close();
  addProjectForm.reset();
  console.log(allProjects);
}

const addTodoButton = document.getElementById("add-todo");
addTodoButton.addEventListener("click", (event) => {
  const dialog = document.getElementById("todoForm");
  dialog.showModal();
});

const addTodoForm = document.getElementById("addTodoForm");
addTodoForm.addEventListener("submit", handleTodoFormSubmit);

function handleTodoFormSubmit(event) {
  event.preventDefault();
  const addTodoForm = document.getElementById("addTodoForm");
  const dialog = document.getElementById("todoForm");

  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("description").value;
  const selectedProject = document.getElementById("projectDropdown").value;
  const dueDate = document.getElementById("add-due-date").value;

  createNewTodo(title, description, selectedProject, dueDate);
  projectDisplay();
  dialog.close();
  addTodoForm.reset();
}

function createNewTodo(title, description, selectedProject, date) {
  const newTodo = new Todo(title, description, selectedProject, date);

  let projectForAddingTodo = allProjects.find(
    (project) => project.name === selectedProject
  );
  if (projectForAddingTodo) {
    projectForAddingTodo.addTodo(newTodo);
  }
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

function createDeleteButton(project, todoIndex) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Todo";
  deleteButton.dataset.todoIndex = todoIndex;

  deleteButton.addEventListener("click", () => {
    const confimrDelete = confirm("Are you sure you want to delete this task?");
    if (confimrDelete) {
      project.todos.splice(todoIndex, 1);
      projectDisplay();
    }
  });
  return deleteButton;
}
