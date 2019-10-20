const Company = require('./Companies.Service');
const validate = require('../../services/ValidationService');

module.exports = {
  getCompanies: async (req, res, next) => {
    const instance = new Company();
    try {
      const data = await instance.getAllCompanies();
      return res.status(200).json({ data, status: 200 });
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  },
  getOneCompany: (req, res, next) => {
    if (!req.params.displayName || !validate.displayName.test(req.params.displayName)) {
      let err = new Error('valid displayName required!');
      err.status = 403;
      return next(err);
    }
    const instance = new Company(req.params);
    return instance
      .getCompany()
      .then(data => {
        if (data === null) {
          let err1 = new Error('Company not found!');
          err1.status = 403;
          return next(err1);
        }
        return res.status(200).json({ data, status: 200 });
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  },
  createCompany: (req, res, next) => {
    if (!req.body.displayName || !validate.displayName.test(req.body.displayName)) {
      let err = new Error('valid displayName required!');
      err.status = 403;
      return next(err);
    }
    const instance = new Company(req.body);
    return instance
      .createCompany()
      .then(data => {
        return res.status(200).json({ data, status: 200 });
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  },
  updateCompany: (req, res, next) => {
    if (!req.params.displayName || !validate.displayName.test(req.params.displayName)) {
      let err = new Error('valid displayName required!');
      err.status = 403;
      return next(err);
    }
    if (!req.body.newDisplayName || !validate.displayName.test(req.body.newDisplayName)) {
      let err2 = new Error('valid newDisplayName required!');
      err2.status = 403;
      return next(err2);
    }
    req.body.displayName = req.params.displayName;
    const instance = new Company(req.body);
    return instance
      .updateCompany()
      .then(data => {
        if (data === null) {
          let err1 = new Error('Company not found!');
          err1.status = 403;
          return next(err1);
        }
        return res.status(200).json({ data, status: 200 });
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  }
};
