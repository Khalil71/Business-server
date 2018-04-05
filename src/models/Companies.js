var mongoose = require('mongoose');
var uuid = require('uuid/v1');

mongoose.Promise = global.Promise;

var usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      reqired: true,
      unique: true,
      lowercase: true,
      sparse: true
    },
    role: { type: String, reqired: true, lowercase: true }
  },
  { _id: false }
);

var workspacesSchema = new mongoose.Schema({
  _id: {
    type: String,
    reqired: true,
    default: uuid
  },
  displayName: { type: String, reqired: true },
  name: {
    type: String,
    reqired: true,
    unique: true,
    lowercase: true,
    sparse: true
  },
  users: [usersSchema]
});

var companiesSchema = new mongoose.Schema({
  _id: {
    type: String,
    reqired: true,
    default: uuid
  },
  displayName: {
    type: String,
    reqired: true
  },
  name: {
    type: String,
    reqired: true,
    unique: true,
    lowercase: true
  },
  workspaces: [workspacesSchema]
});

module.exports = mongoose.model('Companies', companiesSchema);
