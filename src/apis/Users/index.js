var Router = require('express').Router;

var Users = require('./Users.Controller');

var router = new Router();

router.post('/:companyDisplayName/workspaces/:workspaceDispalyName/users', Users.createUser);
router.patch('/:companyDisplayName/workspaces/:workspaceDispalyName/users', Users.updateUser);
router.delete('/:companyDisplayName/workspaces/:workspaceDispalyName/users', Users.removeUser);

module.exports = router;
