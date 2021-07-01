const { Router } = require('express');

const { getCompanies, getOneCompany, createCompany, updateCompany } = require('./Companies.Controller');
const { getOneValidation, createValidation, updateValidation } = require('./Companies.middleware');

let router = new Router();

router.get('/', getCompanies);

router.get('/:displayName', getOneValidation(), getOneCompany);

router.post('/', createValidation(), createCompany);

router.patch('/:displayName', updateValidation(), updateCompany);

module.exports = router;
