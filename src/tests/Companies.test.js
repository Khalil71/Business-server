/* eslint-disable one-var */
const { expect } = require('chai');
const mongoose = require('mongoose');
const Company = require('../apis/Companies/Companies.Service');

describe('Companies Tests', function () {
  before(function (done) {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business', {
      useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', () => console.log('We are connected to Business database!')) // eslint-disable-line 
      .then(() => {
        mongoose.connection.db.dropCollection('companies', () => {
        console.log('Companies collection dropped'); // eslint-disable-line
          done();
        });
      });
  });

  it('should create a new Company', function (done) {
    let data = { displayName: 'Google' },
      instance = new Company(data),
      Create = instance.createCompany();
    Create.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should create another new Company', function (done) {
    let data = { displayName: 'Apple' },
      instance = new Company(data),
      Create = instance.createCompany();
    Create.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should get 1 specific company in the collection', function (done) {
    let data = { displayName: 'Apple' },
      instance = new Company(data),
      getOne = instance.getCompany();
    getOne.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should update 1 specific company in the collection', function (done) {
    let data = { displayName: 'Apple', newDisplayName: 'Ubisoft' },
      instance = new Company(data),
      updateOne = instance.updateCompany();
    updateOne.then(result => {
      expect(result).to.equal('Success');
      done();
    });
  });
});
