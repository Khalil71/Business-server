const User = require('./Users.Service');
const validate = require('../../services/ValidationService');

module.exports = {
  createUser: async (req, res, next) => {
    if (
      !req.params.companyDisplayName ||
      !validate.displayName.test(req.params.companyDisplayName)
    ) {
      let err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.params.workspaceDisplayName ||
      !validate.displayName.test(req.params.workspaceDisplayName)
    ) {
      let err1 = new Error('valid workspaceDisplayName required!');
      err1.status = 403;
      return next(err1);
    }
    if (!req.body.email || !validate.email.test(req.body.email)) {
      let err2 = new Error('valid email required!');
      err2.status = 403;
      return next(err2);
    }
    if (!req.body.role || !validate.roles.test(req.body.role)) {
      let err3 = new Error('valid role required!');
      err3.status = 403;
      return next(err3);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    req.body.workspaceDisplayName = req.params.workspaceDisplayName;
    let instance = new User(req.body);
    try {
      let findUser = await instance.findUser();
      if (findUser != null) {
        let newError = new Error('User already exists!');
        newError.status = 403;
        return next(newError);
      }
      let createUser = await instance.createUser();
      return res.status(200).json({ data: createUser, status: 200 });
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  },
  updateUser: async (req, res, next) => {
    if (
      !req.params.companyDisplayName ||
      !validate.displayName.test(req.params.companyDisplayName)
    ) {
      let err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.params.workspaceDisplayName ||
      !validate.displayName.test(req.params.workspaceDisplayName)
    ) {
      let err1 = new Error('valid workspaceDisplayName required!');
      err1.status = 403;
      return next(err1);
    }
    if (!req.body.email || !validate.email.test(req.body.email)) {
      let err2 = new Error('valid email required!');
      err2.status = 403;
      return next(err2);
    }

    if (req.body.newRole && !validate.roles.test(req.body.newRole)) {
      let err3 = new Error('valid newRole required!');
      err3.status = 403;
      return next(err3);
    }
    if (req.body.newEmail && !validate.email.test(req.body.newEmail)) {
      let err4 = new Error('valid newEmail required!');
      err4.status = 403;
      return next(err4);
    }

    if (!req.body.newRole && !req.body.newEmail) {
      let err5 = new Error('valid newRole required!');
      err5.status = 403;
      return next(err5);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    req.body.workspaceDisplayName = req.params.workspaceDisplayName;
    let instance = new User(req.body);

    try {
      let findUser = await instance.findUser();
      if (findUser === null) {
        let newError = new Error("Record doesn't exist!!");
        newError.status = 403;
        return next(newError);
      }
      if (findUser === true) {
        let dubError = new Error('Email already exists in this scope!!');
        dubError.status = 403;
        return next(dubError);
      }
      let updateUser = await instance.updateUser(findUser);
      return res.status(200).json({ data: updateUser, status: 200 });
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  },

  removeUser: async (req, res, next) => {
    if (
      !req.params.companyDisplayName ||
      !validate.displayName.test(req.params.companyDisplayName)
    ) {
      let err = new Error('valid companyDisplayName required!');
      err.status = 403;
      return next(err);
    }
    if (
      !req.params.workspaceDisplayName ||
      !validate.displayName.test(req.params.workspaceDisplayName)
    ) {
      let err1 = new Error('valid workspaceDisplayName required!');
      err1.status = 403;
      return next(err1);
    }
    if (!req.body.email || !validate.email.test(req.body.email)) {
      let err2 = new Error('valid email required!');
      err2.status = 403;
      return next(err2);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    req.body.workspaceDisplayName = req.params.workspaceDisplayName;
    let instance = new User(req.body);
    try {
      let removeUser = await instance.findUserToRemove();
      if (removeUser === null) {
        let newError = new Error("Record doesn't exist!!");
        newError.status = 403;
        return next(newError);
      }

      if (removeUser === true) {
        let dubError = new Error('Email already exists in this scope!!');
        dubError.status = 403;
        return next(dubError);
      }

      let updateUser = await instance.updateUser(removeUser);
      return res.status(200).json({ data: updateUser, status: 200 });
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  }
};
