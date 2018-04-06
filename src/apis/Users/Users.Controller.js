var User = require('./Users.Service');
var validate = require('../../services/ValidationService');

module.exports = {
  createUser: function (req, res, next) {
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
    if (!req.body.email || !validate.email.test(req.body.email)) {
      var err2 = new Error('valid email required!');
      err2.status = 403;
      return next(err2);
    }
    if (!req.body.role || !validate.roles.test(req.body.role)) {
      var err3 = new Error('valid role required!');
      err3.status = 403;
      return next(err3);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    req.body.workspaceDispalyName = req.params.workspaceDispalyName;
    var instance = new User(req.body);
    // In order to make sure the workspace name is unique within it's workspace's scope
    // I would query the DB twice first to make sure the user doesn't exist
    // sencond to create the user
    return instance
      .findUser()
      .then(function (out) {
        if (out != null) {
          var newError = new Error('User already exists!');
          newError.status = 403;
          return next(newError);
        }
        return instance
          .createUser()
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
  updateUser: function (req, res, next) {
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
    if (!req.body.email || !validate.email.test(req.body.email)) {
      var err2 = new Error('valid email required!');
      err2.status = 403;
      return next(err2);
    }

    if (req.body.newRole && !validate.roles.test(req.body.newRole)) {
      var err3 = new Error('valid newRole required!');
      err3.status = 403;
      return next(err3);
    }
    if (req.body.newEmail && !validate.email.test(req.body.newEmail)) {
      var err4 = new Error('valid newEmail required!');
      err4.status = 403;
      return next(err4);
    }

    if (!req.body.newRole && !req.body.newEmail) {
      var err5 = new Error('valid newRole required!');
      err5.status = 403;
      return next(err5);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    req.body.workspaceDispalyName = req.params.workspaceDispalyName;
    var instance = new User(req.body);
    // I wasn't able to find a way to query the DB for a doulbe nested subdoc
    // so I would query the DB twice first to get the requied document
    // and then chnage the data that is required to be changed
    // sencond to update(save) the whole document
    return instance
      .findUser()
      .then(function (out) {
        if (out === null) {
          var newError = new Error("Record does't exist!!");
          newError.status = 403;
          return next(newError);
        }
        if (out === true) {
          var dubError = new Error('Email already exists in this scope!!');
          dubError.status = 403;
          return next(dubError);
        }
        return instance
          .updateUser(out)
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
  // This proccess is similar to the updateUser method
  removeUser: function (req, res, next) {
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
    if (!req.body.email || !validate.email.test(req.body.email)) {
      var err2 = new Error('valid email required!');
      err2.status = 403;
      return next(err2);
    }
    req.body.companyDisplayName = req.params.companyDisplayName;
    req.body.workspaceDispalyName = req.params.workspaceDispalyName;
    var instance = new User(req.body);
    return instance
      .findUserToRemove()
      .then(function (out) {
        if (out === null) {
          var newError = new Error("Record does't exist!!");
          newError.status = 403;
          return next(newError);
        }
        if (out === true) {
          var dubError = new Error('Email already exists in this scope!!');
          dubError.status = 403;
          return next(dubError);
        }
        return instance
          .updateUser(out)
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
