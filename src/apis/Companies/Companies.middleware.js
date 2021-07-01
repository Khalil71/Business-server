const { displayName } = require('../../services/ValidationService');

module.exports = {
  getOneValidation: () => {
    return (req, res, next) => {
      if (!req.params.displayName || !displayName.test(req.params.displayName)) {
        let err = new Error('valid displayName required!');
        err.status = 403;
        return next(err);
      }
      next();
    };
  },
  createValidation: () => {
    return (req, res, next) => {
      if (!req.body.displayName || !displayName.test(req.body.displayName)) {
        let err = new Error('valid displayName required!');
        err.status = 403;
        return next(err);
      }
      next();
    };
  },
  updateValidation: () => {
    return (req, res, next) => {
      if (!req.params.displayName || !displayName.test(req.params.displayName)) {
        let err = new Error('valid displayName required!');
        err.status = 403;
        return next(err);
      }
      if (!req.body.newDisplayName || !displayName.test(req.body.newDisplayName)) {
        let err = new Error('valid newDisplayName required!');
        err.status = 403;
        return next(err);
      }
      next();
    };
  }
};
