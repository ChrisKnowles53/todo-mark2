// add other fields of dueDate, priority, notes

class Todo {
  constructor(title, description, project) {
    this.title = title;
    this.description = description;
  }
  markAsCompleted() {
    this.completed = true;
  }
}

const todo1 = new Todo("1st Task", "Get the basics working");

export { todo1 };
