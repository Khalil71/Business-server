const Company = require('./Companies.Service');

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
