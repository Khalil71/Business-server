/* eslint-disable one-var */
const Companies = require('../../models/Companies');

class User {
  constructor(data) {
    this.data = data;
  }
  async createUser() {
    try {
      const res = await Companies.update(
        {
          displayName: this.data.companyDisplayName,
          'workspaces.displayName': this.data.workspaceDisplayName
        },
        {
          $push: {
            'workspaces.$.users': {
              email: this.data.email,
              role: this.data.role
            }
          }
        }
      );
      if (res.nModified > 0) {
        return 'Success';
      }
      return 'Record not found!';
    } catch (e) {
      return e;
    }
  }
  async findUser() {
    let workspaceDisplayName = this.data.workspaceDisplayName,
      email = this.data.email,
      newEmail = this.data.newEmail,
      newRole = this.data.newRole;
    try {
      const res = await Companies.findOne({
        displayName: this.data.companyDisplayName,
        'workspaces.displayName': this.data.workspaceDisplayName,
        'workspaces.users.email': this.data.email
      });
      if (res === null) {
        return res;
      }

      let workspaceIndex = res.workspaces
        .findIndex(elem => elem.displayName === workspaceDisplayName);
      let usersIndex = res.workspaces[workspaceIndex].users
        .findIndex(elem => elem.email === email);
      let newUserIndex = res.workspaces[workspaceIndex].users
        .findIndex(elem => elem.email === newEmail);

      if (newEmail && newUserIndex >= 0) {
        return true;
      }
      if (newEmail) {
        res.workspaces[workspaceIndex].users[usersIndex].email = newEmail;
      }
      if (newRole) {
        res.workspaces[workspaceIndex].users[usersIndex].role = newRole;
      }
      return res;
    } catch (e) {
      return e;
    }
  }
  async updateUser(data) {
    try {
      await Companies.update(
        {
          displayName: this.data.companyDisplayName,
          'workspaces.displayName': this.data.workspaceDisplayName,
          'workspaces.users.email': this.data.email
        },
        data
      );
      return 'Success';
    } catch (e) {
      return e;
    }
  }
  async findUserToRemove() {
    let workspaceDisplayName = this.data.workspaceDisplayName;
    let email = this.data.email;
    try {
      const res = await Companies.findOne({
        displayName: this.data.companyDisplayName,
        'workspaces.displayName': this.data.workspaceDisplayName,
        'workspaces.users.email': this.data.email
      });
      if (res === null) {
        return res;
      }
      let workspaceIndex = res.workspaces
          .findIndex(elem => elem.displayName === workspaceDisplayName),
        usersIndex = res.workspaces[workspaceIndex].users
          .findIndex(elem => elem.email === email),
        removeObj = res.workspaces[workspaceIndex].users[usersIndex],
        lastObj =
        res.workspaces[workspaceIndex].users[res.workspaces[workspaceIndex].users.length - 1];

      res.workspaces[workspaceIndex].users[usersIndex] = lastObj;
      res.workspaces[workspaceIndex].users[
        res.workspaces[workspaceIndex].users.length - 1
      ] = removeObj;
      res.workspaces[workspaceIndex].users.pop();

      return res;
    } catch (e) {
      return e;
    }
  }
}

module.exports = User;
