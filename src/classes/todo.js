// add other fields of dueDate, priority, notes
class Todo {
  constructor(title, description, project, date) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.completed = false;
    this.date = date;
  }
  markAsCompleted() {
    this.completed = true;
  }
}

const todo1 = new Todo(
  "1st Task",
  "Get the basics working",
  "Default Project",
  "2023-11-24"
);
const todo2 = new Todo(
  "2nd Task",
  "did this update project2",
  "2nd Project",
  "2023-11-30"
);

export { todo1, todo2 };
export default Todo;
