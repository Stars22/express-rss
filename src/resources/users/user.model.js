const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskService = require('../tasks/task.service');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  { versionKey: false }
);
// password exclusion from response is also implemented by mongodb projection
userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.method('toJSON', function toJson() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
userSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function updateTasks() {
    await taskService.updateUserTasks(this._id);
  }
);
userSchema.pre('save', async function save(next) {
  // this = user doc
  this.password = await bcrypt.hash(this.password, 2);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }
