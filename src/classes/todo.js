// add other fields of dueDate, priority, notes
class Todo {
  constructor(title, description, project, date, completed = false) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.date = date;
    this.completed = completed;
  }
  toggleCompleted() {
    this.completed = !this.completed;
  }
  static fromData(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.project,
      data.date,
      data.completed
    );
    return todo;
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
