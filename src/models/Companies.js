const mongoose = require('mongoose');
const uuid = require('uuid/v1');

mongoose.Promise = global.Promise;

let usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    role: { type: String, required: true, lowercase: true }
  },
  { _id: false }
);

let workspacesSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: uuid
  },
  displayName: { type: String, required: true },
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  users: [usersSchema]
});

let companiesSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: uuid
  },
  displayName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  workspaces: [workspacesSchema]
});

module.exports = mongoose.model('Companies', companiesSchema);
