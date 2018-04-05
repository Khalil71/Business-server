var Companies = require('../../models/Companies');

function Workspace(data) {
  this.data = data;
}

Workspace.prototype.findWorkspace = function () {
  return Companies.findOne({
    displayName: this.data.companyDisplayName,
    'workspaces.displayName': this.data.workspaceDispalyName
  })
    .then(function (res) {
      return res;
    })
    .catch(function (e) {
      return e;
    });
};

Workspace.prototype.findWorkspaceToUpdate = function () {
  return Companies.findOne({
    displayName: this.data.companyDisplayName,
    'workspaces.displayName': this.data.newWorkspaceDispalyName
  })
    .then(function (res) {
      return res;
    })
    .catch(function (e) {
      return e;
    });
};

Workspace.prototype.createWorkspace = function () {
  return Companies.update(
    { displayName: this.data.companyDisplayName },
    {
      $push: {
        workspaces: {
          displayName: this.data.workspaceDispalyName,
          name: this.data.workspaceDispalyName.toLowerCase()
        }
      }
    }
  )
    .then(function (res) {
      if (res.nModified > 0) {
        return 'Success';
      }
      return 'Nothing was Updated';
    })
    .catch(function (e) {
      return e;
    });
};

Workspace.prototype.updateWorkspace = function () {
  return Companies.update(
    {
      displayName: this.data.companyDisplayName,
      'workspaces.displayName': this.data.workspaceDispalyName
    },
    {
      $set: {
        'workspaces.$.displayName': this.data.newWorkspaceDispalyName,
        'workspaces.$.name': this.data.newWorkspaceDispalyName.toLowerCase()
      }
    }
  )
    .then(function (res) {
      if (res.nModified > 0) {
        return 'Success';
      }
      return 'Nothing was Updated';
    })
    .catch(function (e) {
      return e;
    });
};

module.exports = Workspace;
