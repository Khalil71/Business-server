var expect = require('chai').expect;
var mongoose = require('mongoose');
var Company = require('../apis/Companies/Companies.Service');
var Workspace = require('../apis/Workspaces/Workspaces.Service');
var Companies = require('../models/Companies');

describe('Workspace Tests', function () {
  before(function (done) {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', function () {
      console.log('We are connected to test database!'); // eslint-disable-line
      return done();
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

  it('should create a new Workspace', function (done) {
    var data = { companyDisplayName: 'Google', workspaceDispalyName: 'SomweWorkSpace' };
    var instance = new Workspace(data);
    var Create = instance.createWorkspace();
    Create.then(function (result) {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should get update 1 workspace', function (done) {
    var data = {
      companyDisplayName: 'Google',
      workspaceDispalyName: 'SomweWorkSpace',
      newWorkspaceDispalyName: 'NewWorkspace'
    };
    var instance = new Workspace(data);
    var getOne = instance.updateWorkspace();
    getOne.then(function (result) {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should find 1 specefic company in the collection', function (done) {
    var data = { companyDisplayName: 'Google', workspaceDispalyName: 'NewWorkspace' };
    var instance = new Workspace(data);
    var updateOne = instance.findWorkspace();
    updateOne.then(function (result) {
      expect(result.workspaces[0].displayName).to.equal(data.workspaceDispalyName);
      done();
    });
  });
});
