const uuid = require('uuid');

class Task {
  constructor(taskData) {
    const { title, order, description, userId, columnId, boardId } = taskData;
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
    this.boardId = boardId;
  }
}

module.exports = Task;
