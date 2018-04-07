var Companies = require('../../models/Companies');

function User(data) {
  this.data = data;
}

User.prototype.createUser = function () {
  return Companies.update(
    {
      displayName: this.data.companyDisplayName,
      'workspaces.displayName': this.data.workspaceDispalyName
    },
    {
      $push: {
        'workspaces.$.users': {
          email: this.data.email,
          role: this.data.role
        }
      }
    }
  )
    .then(function (res) {
      if (res.nModified > 0) {
        return 'Success';
      }
      return 'Record not found!';
    })
    .catch(function (e) {
      return e;
    });
};

User.prototype.findUser = function () {
  var workspaceDispalyName = this.data.workspaceDispalyName;
  var email = this.data.email;
  var newEmail = this.data.newEmail;
  var newRole = this.data.newRole;
  return Companies.findOne({
    displayName: this.data.companyDisplayName,
    'workspaces.displayName': this.data.workspaceDispalyName,
    'workspaces.users.email': this.data.email
  })
    .then(function (res) {
      if (res === null) {
        return res;
      }
      // Here I simply got the requied user object by index and changed its values with the new data
      var workspaceIndex = res.workspaces.findIndex(function (elem) {
        return elem.displayName === workspaceDispalyName;
      });
      var usersIndex = res.workspaces[workspaceIndex].users.findIndex(function (elem) {
        return elem.email === email;
      });
      var newUserIndex = res.workspaces[workspaceIndex].users.findIndex(function (elem) {
        return elem.email === newEmail;
      });
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
    })
    .catch(function (e) {
      return e;
    });
};

User.prototype.updateUser = function (data) {
  return Companies.update(
    {
      displayName: this.data.companyDisplayName,
      'workspaces.displayName': this.data.workspaceDispalyName,
      'workspaces.users.email': this.data.email
    },
    data
  )
    .then(function () {
      return 'Success';
    })
    .catch(function (e) {
      return e;
    });
};

User.prototype.findUserToRemove = function () {
  var workspaceDispalyName = this.data.workspaceDispalyName;
  var email = this.data.email;
  return Companies.findOne({
    displayName: this.data.companyDisplayName,
    'workspaces.displayName': this.data.workspaceDispalyName,
    'workspaces.users.email': this.data.email
  })
    .then(function (res) {
      if (res === null) {
        return res;
      }
      var workspaceIndex = res.workspaces.findIndex(function (elem) {
        return elem.displayName === workspaceDispalyName;
      });
      var usersIndex = res.workspaces[workspaceIndex].users.findIndex(function (elem) {
        return elem.email === email;
      });
      res.workspaces[workspaceIndex].users.splice(usersIndex, 1);
      return res;
    })
    .catch(function (e) {
      return e;
    });
};

module.exports = User;
