import dateFormat from "./datefns";
import Todo from "./classes/todo";
import { allProjects } from "./classes/project";
import Project from "./classes/project";
import { projectDisplay } from "./createProject";
import showAllToDos from "./showAll";

function createTodoList(project) {
  const todoList = document.createElement("ul");
  todoList.style.display = "none";

  project.todos.forEach((todo, index) => {
    const todoListItem = createTodoListItem(todo, index, project);
    todoList.appendChild(todoListItem);
  });
  return todoList;
}
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
    Project.saveArrayToLocalStorage();
  } else {
    console.error("project not found or not a valid instance");
  }
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

    saveButton.removeEventListener("click", saveButton.handler);

    saveButton.handler = function (event) {
      event.preventDefault();
      const currentTodoIndex = parseInt(editButton.dataset.todoIndex);
      const updatedTitle = titleInput.value;
      const updatedDescription = descriptionInput.value;
      const updatedDate = dateInput.value;
      //   const selectedProject = todo.project;

      const projectForUpdatingTodo = allProjects.find(
        (project) => project.name === todo.project
      );

      if (projectForUpdatingTodo && currentTodoIndex !== undefined) {
        const todoToUpdate = projectForUpdatingTodo.todos[currentTodoIndex];
        todoToUpdate.title = updatedTitle;
        todoToUpdate.description = updatedDescription;
        todoToUpdate.date = updatedDate;

        Project.saveArrayToLocalStorage();
        projectDisplay();
        showAllToDos(allProjects);
        dialog.close();
      }
    };
    saveButton.addEventListener("click", saveButton.handler);
    dialog.showModal();
  });

  return editButton;
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

function createTodoListItem(todo, index, project) {
  const todoListItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `todo-complete-${index}`;
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    console.log(todo);
    todo.toggleCompleted();
    Project.saveArrayToLocalStorage();
    projectDisplay();
  });
  const checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", `todo-complete-${index}`);
  checkboxLabel.setAttribute("id", "checkbox-label");
  checkboxLabel.textContent = "Completed ?";
  checkboxLabel.style.display = "block";

  const todoTitleContainer = document.createElement("p");
  todoTitleContainer.setAttribute("id", "todo-title-and-button");

  const todoTitle = document.createElement("p");
  todoTitle.textContent = todo.title;
  if (todo.completed) {
    todoTitle.classList.add("completed");
  }

  const listItemButton = createListItemButton(index, todoListItem);

  todoTitleContainer.prepend(checkbox);
  todoTitleContainer.prepend(checkboxLabel);
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
export { createTodoList, createTodoListItem, handleTodoFormSubmit };
