const { displayName } = require('../../services/ValidationService');

module.exports = {
  paramsValidation: () => {
    return (req, res, next) => {
      if (!req.params.companyDisplayName || !displayName.test(req.params.companyDisplayName)) {
        let err = new Error('valid companyDisplayName required!');
        err.status = 403;
        return next(err);
      }
      if (!req.body.workspaceDisplayName || !displayName.test(req.body.workspaceDisplayName)) {
        let err1 = new Error('valid workspaceDisplayName required!');
        err1.status = 403;
        return next(err1);
      }
      next();
    };
  },

  bodyValidation: () => {
    return (req, res, next) => {
      if (!req.body.newWorkspaceDisplayName || !displayName.test(req.body.newWorkspaceDisplayName)) {
        let err = new Error('valid newWorkspaceDisplayName required!');
        err.status = 403;
        return next(err);
      }
      next();
    };
  }
};
