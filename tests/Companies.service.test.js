/* eslint-disable one-var */
const { expect } = require('chai');
const { mongoStart, dropCollection } = require('../src/services/templates');

const Company = require('../src/apis/Companies/Companies.Service');

describe('Companies Tests', function() {
  before(function() {
    mongoStart();
  });
  after(function(done) {
    dropCollection(done);
  });

  it('should create a new Company', function(done) {
    let data = { displayName: 'Google' },
      instance = new Company(data),
      Create = instance.createCompany();
    Create.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should create another new Company', function(done) {
    let data = { displayName: 'Apple' },
      instance = new Company(data),
      Create = instance.createCompany();
    Create.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should get 1 specific company in the collection', function(done) {
    let data = { displayName: 'Apple' },
      instance = new Company(data),
      getOne = instance.getCompany();
    getOne.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should update 1 specific company in the collection', function(done) {
    let data = { displayName: 'Apple', newDisplayName: 'Ubisoft' },
      instance = new Company(data),
      updateOne = instance.updateCompany();
    updateOne.then(result => {
      expect(result).to.equal('Success');
      done();
    });
  });
});
