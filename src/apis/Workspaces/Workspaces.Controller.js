const Workspace = require('./Workspaces.Service');

module.exports = {
  createWorkspace: async (req, res, next) => {
    req.body.companyDisplayName = req.params.companyDisplayName;
    let instance = new Workspace(req.body);

    try {
      let findWorkspace = await instance.findWorkspace();
      if (findWorkspace) {
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
    req.body.workspaceDisplayName = req.params.workspaceDisplayName;
    req.body.companyDisplayName = req.params.companyDisplayName;
    let instance = new Workspace(req.body);

    try {
      let findWorkspaceToUpdate = await instance.findWorkspaceToUpdate();
      if (findWorkspaceToUpdate) {
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
