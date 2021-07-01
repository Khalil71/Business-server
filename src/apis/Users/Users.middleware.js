const { displayName, email, roles } = require('../../services/ValidationService');

module.exports = {
  createValidation: () => {
    return (req, res, next) => {
      if (!req.params.companyDisplayName || !displayName.test(req.params.companyDisplayName)) {
        let err = new Error('valid companyDisplayName required!');
        err.status = 403;
        return next(err);
      }
      if (!req.params.workspaceDisplayName || !displayName.test(req.params.workspaceDisplayName)) {
        let err1 = new Error('valid workspaceDisplayName required!');
        err1.status = 403;
        return next(err1);
      }
      if (!req.body.email || !email.test(req.body.email)) {
        let err2 = new Error('valid email required!');
        err2.status = 403;
        return next(err2);
      }
      if (!req.body.role || !roles.test(req.body.role)) {
        let err3 = new Error('valid role required!');
        err3.status = 403;
        return next(err3);
      }
      next();
    };
  },
  updateValidation: () => {
    return (req, res, next) => {
      if (!req.params.companyDisplayName || !displayName.test(req.params.companyDisplayName)) {
        let err = new Error('valid companyDisplayName required!');
        err.status = 403;
        return next(err);
      }
      if (!req.params.workspaceDisplayName || !displayName.test(req.params.workspaceDisplayName)) {
        let err1 = new Error('valid workspaceDisplayName required!');
        err1.status = 403;
        return next(err1);
      }
      if (!req.body.email || !email.test(req.body.email)) {
        let err2 = new Error('valid email required!');
        err2.status = 403;
        return next(err2);
      }

      if (req.body.newRole && !roles.test(req.body.newRole)) {
        let err3 = new Error('valid newRole required!');
        err3.status = 403;
        return next(err3);
      }
      if (req.body.newEmail && !email.test(req.body.newEmail)) {
        let err4 = new Error('valid newEmail required!');
        err4.status = 403;
        return next(err4);
      }

      if (!req.body.newRole && !req.body.newEmail) {
        let err5 = new Error('valid newRole required!');
        err5.status = 403;
        return next(err5);
      }
      next();
    };
  },
  removeValidation: () => {
    return (req, res, next) => {
      if (!req.params.companyDisplayName || !displayName.test(req.params.companyDisplayName)) {
        let err = new Error('valid companyDisplayName required!');
        err.status = 403;
        return next(err);
      }
      if (!req.params.workspaceDisplayName || !displayName.test(req.params.workspaceDisplayName)) {
        let err1 = new Error('valid workspaceDisplayName required!');
        err1.status = 403;
        return next(err1);
      }
      if (!req.body.email || !email.test(req.body.email)) {
        let err2 = new Error('valid email required!');
        err2.status = 403;
        return next(err2);
      }
      next();
    };
  }
};
