const uuid = require('uuid');
const mongoose = require('mongoose');
const taskService = require('../tasks/task.service');

const boardSchema = mongoose.Schema(
  {
    title: String,
    columns: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.method('toJSON', function toJson() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
boardSchema.post(
  'deleteOne',
  { document: true, query: false },
  function deleteTasks() {
    taskService.deleteBoardTasks(this._id);
  }
);

module.exports = mongoose.model('Board', boardSchema);

// class Board {
//   constructor(title, columns) {
//     this.title = title;
//     this.columns = columns;
//     this.id = uuid();
//   }
// }
