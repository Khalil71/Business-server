const { Router } = require('express');

const Companies = require('./Companies.Controller');

let router = new Router();

router.get('/', Companies.getCompanies);

router.get('/:displayName', Companies.getOneCompany);

router.post('/', Companies.createCompany);

router.patch('/:displayName', Companies.updateCompany);

module.exports = router;
