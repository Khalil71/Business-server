var Workspace = require('./Workspaces.Service');
var validate = require('../../services/ValidationService');

module.exports = {
  createWorkspace: function (req, res, next) {
    // To make sure the workspace name is unique within it's Company's findWorkspaceToUpdate
    // I had to query the DB twice first to find if the name already exisits in this scopre
    // second to create the workspace incase the workspace doesn't already exist
    if (
      !req.params.companyDisplayName ||
      !validate.displayName.test(req.params.companyDisplayName)
    ) {
      var err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.body.workspaceDispalyName ||
      !validate.displayName.test(req.body.workspaceDispalyName)
    ) {
      var err1 = new Error('valid workspaceDispalyName required!');
      err1.status = 403;
      return next(err1);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    var instance = new Workspace(req.body);
    return instance
      .findWorkspace()
      .then(function (out) {
        if (out != null) {
          var newError = new Error('Worskapce name already exists!');
          newError.status = 403;
          return next(newError);
        }
        return instance
          .createWorkspace()
          .then(function (result) {
            return res.status(200).json({ data: result, status: 200 });
          })
          .catch(function (e) {
            e.status = 403;
            return next(e);
          });
      })
      .catch(function (e) {
        e.status = 403;
        return next(e);
      });
  },
  updateWorkspace: function (req, res, next) {
    // this process is simillar to the createWorkspace method
    if (
      !req.params.companyDisplayName ||
      !validate.displayName.test(req.params.companyDisplayName)
    ) {
      var err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.params.workspaceDispalyName ||
      !validate.displayName.test(req.params.workspaceDispalyName)
    ) {
      var err1 = new Error('valid workspaceDispalyName required!');
      err1.status = 403;
      return next(err1);
    }
    if (
      !req.body.newWorkspaceDispalyName ||
      !validate.displayName.test(req.body.newWorkspaceDispalyName)
    ) {
      var err3 = new Error('valid newWorkspaceDispalyName required!');
      err3.status = 403;
      return next(err3);
    }
    req.body.workspaceDispalyName = req.params.workspaceDispalyName;
    req.body.companyDisplayName = req.params.companyDisplayName;
    var instance = new Workspace(req.body);
    return instance
      .findWorkspaceToUpdate()
      .then(function (out) {
        if (out != null) {
          var newError = new Error('Worskapce name already exists!');
          newError.status = 403;
          return next(newError);
        }
        return instance
          .updateWorkspace()
          .then(function (result) {
            return res.status(200).json({ data: result, status: 200 });
          })
          .catch(function (e) {
            e.status = 403;
            return next(e);
          });
      })
      .catch(function (e) {
        e.status = 403;
        return next(e);
      });
  }
};
