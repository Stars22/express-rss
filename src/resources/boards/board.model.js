const uuid = require('uuid');

class Board {
  constructor(title, columns) {
    this.title = title;
    this.columns = columns;
    this.id = uuid();
  }
}

module.exports = Board;
