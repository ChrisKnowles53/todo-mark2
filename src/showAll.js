export default function showAllToDos(allProjects) {
  const projectContainers = document.querySelectorAll(".project-container");
  projectContainers.forEach((container) => {
    container.style.display = "none";
  });

  const allTodos = collectAllToDos(allProjects);
  const todosTable = document.createElement("table");
  todosTable.innerHTML = `
              <tr>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Due Date</th>
              </tr>
          `;

  allTodos.forEach((todo) => {
    const row = todosTable.insertRow();
    row.innerHTML = `
              <td>${todo.project}</td>
              <td>${todo.title}</td>
              <td>${todo.description}</td>
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
      if (!todo.completed) {
        allTodos.push({
          title: todo.title,
          description: todo.description,
          project: project.name,
          dueDate: todo.date,
        });
      }
    });
  });

  allTodos.sort((a, b) => compareDates(a.dueDate, b.dueDate));

  return allTodos;
}

function compareDates(date1, date2) {
  return new Date(date1) - new Date(date2);
}
