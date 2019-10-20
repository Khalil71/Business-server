const { Router } = require('express');

const {
  getCompanies, getOneCompany, createCompany, updateCompany
} = require('./Companies.Controller');

let router = new Router();

router.get('/', getCompanies);

router.get('/:displayName', getOneCompany);

router.post('/', createCompany);

router.patch('/:displayName', updateCompany);

module.exports = router;
