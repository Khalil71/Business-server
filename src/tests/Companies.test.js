var expect = require('chai').expect;
var mongoose = require('mongoose');
var Company = require('../apis/Companies/Companies.Service');
var Companies = require('../models/Companies');

describe('Companies Tests', function () {
  before(function (done) {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', function () {
      console.log('We are connected to test database!'); // eslint-disable-line
      done();
    });
  });

  it('should remove all records from the DB', function (done) {
    Companies.remove({}).then(function () {
      return done();
    });
  });

  it('should create a new Company', function (done) {
    var data = { displayName: 'Google' };
    var instance = new Company(data);
    var Create = instance.createCompany();
    Create.then(function (result) {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should create another new Company', function (done) {
    var data = { displayName: 'Apple' };
    var instance = new Company(data);
    var Create = instance.createCompany();
    Create.then(function (result) {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should get 1 specefic company in the collection', function (done) {
    var data = { displayName: 'Apple' };
    var instance = new Company(data);
    var getOne = instance.getCompany();
    getOne.then(function (result) {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should update 1 specefic company in the collection', function (done) {
    var data = { displayName: 'Apple', newDisplayName: 'Ubisoft' };
    var instance = new Company(data);
    var updateOne = instance.updateCompany();
    updateOne.then(function (result) {
      expect(result).to.equal('Success');
      done();
    });
  });
});
