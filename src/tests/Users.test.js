var expect = require('chai').expect;
var mongoose = require('mongoose');
var Company = require('../apis/Companies/Companies.Service');
var Workspace = require('../apis/Workspaces/Workspaces.Service');
var Users = require('../apis/Users/Users.Service');

describe('Users Tests', () => {
  before(function (done) {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', function () {
      console.log('We are connected to Business database!'); // eslint-disable-line
      done();
    });
  });

  before(function (done) {
    mongoose.connection.db.dropCollection('companies', function () {
      console.log('Companies collection dropped'); // eslint-disable-line
      done();
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

  it('should create a new User', function (done) {
    var data = {
      companyDisplayName: 'Google',
      workspaceDispalyName: 'SomweWorkSpace',
      email: 'test@test.com',
      role: 'basic'
    };
    var instance = new Users(data);
    var Create = instance.createUser();
    Create.then(function (result) {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should update an existing User', function (done) {
    var data = {
      companyDisplayName: 'Google',
      workspaceDispalyName: 'SomweWorkSpace',
      email: 'test@test.com',
      newRole: 'admin',
      newEmail: 'test99@test.com'
    };
    var instance = new Users(data);
    var Update = instance.findUser();
    Update.then(function (result) {
      return instance.updateUser(result).then(function (res) {
        expect(res).to.equal('Success');
        done();
      });
    });
  });

  it('should remove an existing User', function (done) {
    var data = {
      companyDisplayName: 'Google',
      workspaceDispalyName: 'SomweWorkSpace',
      email: 'test99@test.com'
    };
    var instance = new Users(data);
    var Update = instance.findUserToRemove();
    Update.then(function (result) {
      return instance.updateUser(result).then(function (res) {
        expect(res).to.equal('Success');
        done();
      });
    });
  });
});
