const Companies = require('../../models/Companies');

class Workspace {
  constructor(data) {
    this.data = data;
  }
  async findWorkspace() {
    try {
      const res = await Companies.findOne({
        displayName: this.data.companyDisplayName,
        'workspaces.displayName': this.data.workspaceDisplayName
      });
      return res;
    } catch (e) {
      return e;
    }
  }
  async findWorkspaceToUpdate() {
    try {
      const res = await Companies.findOne({
        displayName: this.data.companyDisplayName,
        'workspaces.displayName': this.data.newWorkspaceDisplayName
      });
      return res;
    } catch (e) {
      return e;
    }
  }
  async createWorkspace() {
    let res;
    try {
      res = await Companies.updateOne(
        { displayName: this.data.companyDisplayName },
        {
          $push: {
            workspaces: {
              displayName: this.data.workspaceDisplayName,
              name: this.data.workspaceDisplayName.toLowerCase()
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
    return 'Nothing was Updated';
  }
  async updateWorkspace() {
    let res;
    try {
      res = await Companies.updateOne(
        {
          displayName: this.data.companyDisplayName,
          'workspaces.displayName': this.data.workspaceDisplayName
        },
        {
          $set: {
            'workspaces.$.displayName': this.data.newWorkspaceDisplayName,
            'workspaces.$.name': this.data.newWorkspaceDisplayName.toLowerCase()
          }
        }
      );
    } catch (e) {
      return e;
    }
    if (res.nModified > 0) {
      return 'Success';
    }
    return 'Nothing was Updated';
  }
}

module.exports = Workspace;
