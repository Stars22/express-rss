const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
UserSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

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

module.exports = mongoose.model('User', UserSchema);
