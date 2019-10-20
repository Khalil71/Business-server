const { expect } = require('chai');
const mongoose = require('mongoose');
const Company = require('../apis/Companies/Companies.Service');
const Workspace = require('../apis/Workspaces/Workspaces.Service');
const Users = require('../apis/Users/Users.Service');

describe('Users Tests', function () {
  before(function (done) {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business', { useNewUrlParser: true });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', () => {
      console.log('We are connected to Business database!'); // eslint-disable-line
    }).then(() => {
      mongoose.connection.db.dropCollection('companies', () => {
        console.log('Companies collection dropped'); // eslint-disable-line
        done();
      });
    });
  });

  it('should create a new Company', function (done) {
    let data = { displayName: 'Google' };
    let instance = new Company(data);
    let Create = instance.createCompany();
    Create.then((result) => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should create a new Workspace', function (done) {
    let data = { companyDisplayName: 'Google', workspaceDisplayName: 'SomeWorkSpace' };
    let instance = new Workspace(data);
    let Create = instance.createWorkspace();
    Create.then((result) => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should create a new User', function (done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      email: 'test@test.com',
      role: 'basic'
    };
    let instance = new Users(data);
    let Create = instance.createUser();
    Create.then((result) => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should update an existing User', function (done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      email: 'test@test.com',
      newRole: 'admin',
      newEmail: 'test99@test.com'
    };
    let instance = new Users(data);
    let Update = instance.findUser();
    Update.then(async (result) => {
      const res = await instance.updateUser(result);
      expect(res).to.equal('Success');
      done();
    });
  });

  it('should remove an existing User', function (done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      email: 'test99@test.com'
    };
    let instance = new Users(data);
    let Update = instance.findUserToRemove();
    Update.then(async (result) => {
      const res = await instance.updateUser(result);
      expect(res).to.equal('Success');
      done();
    });
  });
});
