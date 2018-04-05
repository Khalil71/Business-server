var Router = require('express').Router;

var Companies = require('./Companies.Controller');

var router = new Router();

router.get('/', Companies.getCompanies);

router.get('/:displayName', Companies.getOneCompany);

router.post('/', Companies.createCompany);

router.patch('/:displayName', Companies.updateCompany);

module.exports = router;
