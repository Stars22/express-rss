const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  title: String,
  columns: Array,
  _id: {
    type: String,
    default: uuid
  }
});

// class Board {
//   constructor(title, columns) {
//     this.title = title;
//     this.columns = columns;
//     this.id = uuid();
//   }
// }

module.exports = mongoose.model('Board', boardSchema);
