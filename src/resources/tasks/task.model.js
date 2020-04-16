const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  columnId: String,
  boardId: String
});

// class Task {
//   constructor(taskData) {
//     const { title, order, description, userId, columnId, boardId } = taskData;
//     this.id = uuid();
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.columnId = columnId;
//     this.boardId = boardId;
//   }
// }

module.exports = mongoose.model('Task', taskSchema);
