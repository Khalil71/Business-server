const User = require('./Users.Service');

module.exports = {
  createUser: async (req, res, next) => {
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
