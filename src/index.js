import "./styles.css";
import { allProjects } from "./classes/project";
import Project from "./classes/project";
import Todo from "./classes/todo";
import dateFormat from "./datefns";
import { saveArrayToLocalStorage } from "./localStorage";

projectDisplay();
updateProjectDropdown();

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
      console.log(allProjects);
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
  const deleteButton = createTodoDeleteButton(project, index);
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
  console.log(allProjects);

  allProjects.forEach((project, index) => {
    const projectContainer = createProjectContainer(project, index);
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

  const newProject = new Project(title);
  newProject.saveArrayToLocalStorage();

  projectDisplay();
  updateProjectDropdown();
  dialog.close();
  addProjectForm.reset();
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
  showAllToDos(allProjects);
  dialog.close();
  addTodoForm.reset();
}

function createNewTodo(title, description, selectedProject, date) {
  const newTodo = new Todo(title, description, selectedProject, date);

  let projectForAddingTodo = allProjects.find(
    (project) => project.name === selectedProject
  );
  if (projectForAddingTodo instanceof Project) {
    projectForAddingTodo.addTodo(newTodo);
  } else {
    console.error("project not found or not a valid instance");
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

function createTodoDeleteButton(project, todoIndex) {
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

function showAllToDos(allProjects) {
  const projectContainers = document.querySelectorAll(".project-container");
  projectContainers.forEach((container) => {
    container.style.display = "none";
  });

  const allTodos = collectAllToDos(allProjects);
  const todosTable = document.createElement("table");
  todosTable.innerHTML = `
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Project</th>
                <th>Due Date</th>
            </tr>
        `;

  allTodos.forEach((todo) => {
    const row = todosTable.insertRow();
    row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.project}</td>
            <td>${todo.dueDate}</td>
            `;
  });
  const todosDisplay = document.getElementById("todos-display");
  todosDisplay.innerHTML = "";
  todosDisplay.appendChild(todosTable);
}

function collectAllToDos(allProjects) {
  const allTodos = [];
  allProjects.forEach((project) => {
    project.todos.forEach((todo) => {
      allTodos.push({
        title: todo.title,
        description: todo.description,
        project: project.name,
        dueDate: todo.date,
      });
    });
  });

  allTodos.sort((a, b) => compareDates(a.dueDate, b.dueDate));

  return allTodos;
}

function compareDates(date1, date2) {
  return new Date(date1) - new Date(date2);
}
