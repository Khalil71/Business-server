const Companies = require('../../models/Companies');

class User {
  constructor(data) {
    this.data = data;
  }
  async createUser() {
    let res;

    try {
      res = await Companies.updateOne(
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
    } catch (e) {
      return e;
    }

    if (res.nModified > 0) {
      return 'Success';
    }

    return 'Record not found!';
  }

  async findUser() {
    let workspaceDisplayName = this.data.workspaceDisplayName;
    let email = this.data.email;
    let newEmail = this.data.newEmail;
    let newRole = this.data.newRole;
    let res;

    try {
      res = await Companies.findOne({
        displayName: this.data.companyDisplayName,
        'workspaces.displayName': this.data.workspaceDisplayName,
        'workspaces.users.email': this.data.email
      });
    } catch (e) {
      return e;
    }

    if (!res) return;

    let workspaceIndex = res.workspaces.findIndex(elem => elem.displayName === workspaceDisplayName);
    let usersInWorkspace = res.workspaces[workspaceIndex].users;

    let usersIndex = usersInWorkspace.findIndex(elem => elem.email === email);
    let newUserIndex = usersInWorkspace.findIndex(elem => elem.email === newEmail);

    if (newEmail && newUserIndex >= 0) {
      return true;
    }
    if (newEmail) {
      usersInWorkspace[usersIndex].email = newEmail;
    }
    if (newRole) {
      usersInWorkspace[usersIndex].role = newRole;
    }

    return res;
  }

  async updateUser(data) {
    try {
      await Companies.updateOne(
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
    let res;

    try {
      res = await Companies.findOne({
        displayName: this.data.companyDisplayName,
        'workspaces.displayName': this.data.workspaceDisplayName,
        'workspaces.users.email': this.data.email
      });
    } catch (e) {
      return e;
    }
    if (!res) return;

    let workspaceIndex = res.workspaces.findIndex(elem => elem.displayName === workspaceDisplayName);
    let usersInWorkspace = res.workspaces[workspaceIndex].users;

    let usersIndex = usersInWorkspace.findIndex(elem => elem.email === email);
    let removeObj = usersInWorkspace[usersIndex];
    let lastObj = usersInWorkspace[usersInWorkspace.length - 1];

    usersInWorkspace[usersIndex] = lastObj;
    usersInWorkspace[usersInWorkspace.length - 1] = removeObj;
    usersInWorkspace.pop();

    return res;
  }
}

module.exports = User;
