var Company = require('./Companies.Service');
var validate = require('../../services/ValidationService');

module.exports = {
  getCompanies: function (req, res, next) {
    var instance = new Company();
    return instance
      .getAllCompanies()
      .then(function (data) {
        return res.status(200).json({ data: data, status: 200 });
      })
      .catch(function (e) {
        e.status = 403;
        return next(e);
      });
  },
  getOneCompany: function (req, res, next) {
    if (!req.params.displayName || !validate.displayName.test(req.params.displayName)) {
      var err = new Error('valid displayName required!');
      err.status = 403;
      return next(err);
    }
    var instance = new Company(req.params);
    return instance
      .getCompany()
      .then(function (data) {
        if (data === null) {
          var err1 = new Error('Company not found!');
          err1.status = 403;
          return next(err1);
        }
        return res.status(200).json({ data: data, status: 200 });
      })
      .catch(function (e) {
        e.status = 403;
        return next(e);
      });
  },
  createCompany: function (req, res, next) {
    if (!req.body.displayName || !validate.displayName.test(req.body.displayName)) {
      var err = new Error('valid displayName required!');
      err.status = 403;
      return next(err);
    }
    var instance = new Company(req.body);
    return instance
      .createCompany()
      .then(function (result) {
        return res.status(200).json({ data: result, status: 200 });
      })
      .catch(function (e) {
        e.status = 403;
        return next(e);
      });
  },
  updateCompany: function (req, res, next) {
    if (!req.params.displayName || !validate.displayName.test(req.params.displayName)) {
      var err = new Error('valid displayName required!');
      err.status = 403;
      return next(err);
    }
    if (!req.body.newDisplayName || !validate.displayName.test(req.body.newDisplayName)) {
      var err2 = new Error('valid newDisplayName required!');
      err2.status = 403;
      return next(err2);
    }
    req.body.displayName = req.params.displayName;
    var instance = new Company(req.body);
    return instance
      .updateCompany()
      .then(function (data) {
        if (data === null) {
          var err1 = new Error('Company not found!');
          err1.status = 403;
          return next(err1);
        }
        return res.status(200).json({ data: data, status: 200 });
      })
      .catch(function (e) {
        e.status = 403;
        return next(e);
      });
  }
};
