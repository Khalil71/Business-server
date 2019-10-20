const Workspace = require('./Workspaces.Service');
const { displayName } = require('../../services/ValidationService');

module.exports = {
  createWorkspace: async (req, res, next) => {
    if (
      !req.params.companyDisplayName ||
      !displayName.test(req.params.companyDisplayName)
    ) {
      let err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.body.workspaceDisplayName ||
      !displayName.test(req.body.workspaceDisplayName)
    ) {
      let err1 = new Error('valid workspaceDisplayName required!');
      err1.status = 403;
      return next(err1);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    let instance = new Workspace(req.body);
    try {
      let findWorkspace = await instance.findWorkspace();
      if (findWorkspace != null) {
        let newError = new Error('WorkSpace name already exists!');
        newError.status = 403;
        return next(newError);
      }
      let createWorkspace = await instance.createWorkspace();
      return res.status(200).json({ data: createWorkspace, status: 200 });
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  },
  updateWorkspace: async (req, res, next) => {
    if (
      !req.params.companyDisplayName ||
      !displayName.test(req.params.companyDisplayName)
    ) {
      let err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.params.workspaceDisplayName ||
      !displayName.test(req.params.workspaceDisplayName)
    ) {
      let err1 = new Error('valid workspaceDisplayName required!');
      err1.status = 403;
      return next(err1);
    }
    if (
      !req.body.newWorkspaceDisplayName ||
      !displayName.test(req.body.newWorkspaceDisplayName)
    ) {
      let err3 = new Error('valid newWorkspaceDisplayName required!');
      err3.status = 403;
      return next(err3);
    }
    req.body.workspaceDisplayName = req.params.workspaceDisplayName;
    req.body.companyDisplayName = req.params.companyDisplayName;
    let instance = new Workspace(req.body);

    try {
      let findWorkspaceToUpdate = await instance.findWorkspaceToUpdate();
      if (findWorkspaceToUpdate != null) {
        let newError = new Error('WorkSpace name already exists!');
        newError.status = 403;
        return next(newError);
      }
      let updateWorkspace = await instance.updateWorkspace();
      return res.status(200).json({ data: updateWorkspace, status: 200 });
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  }
};
