const { expect } = require('chai');
const { mongoStart, dropCollection } = require('../src/services/templates');

const Company = require('../src/apis/Companies/Companies.Service');
const Workspace = require('../src/apis/Workspaces/Workspaces.Service');
const Users = require('../src/apis/Users/Users.Service');

describe('Users Tests', function() {
  before(function() {
    mongoStart();
  });
  after(function(done) {
    dropCollection(done);
  });

  it('should create a new Company', function(done) {
    let data = { displayName: 'Google' };
    let instance = new Company(data);
    let Create = instance.createCompany();
    Create.then(result => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should create a new Workspace', function(done) {
    let data = { companyDisplayName: 'Google', workspaceDisplayName: 'SomeWorkSpace' };
    let instance = new Workspace(data);
    let Create = instance.createWorkspace();
    Create.then(result => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should create a new User', function(done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      email: 'test@test.com',
      role: 'basic'
    };
    let instance = new Users(data);
    let Create = instance.createUser();
    Create.then(result => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should update an existing User', function(done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      email: 'test@test.com',
      newRole: 'admin',
      newEmail: 'test99@test.com'
    };
    let instance = new Users(data);
    let Update = instance.findUser();
    Update.then(async result => {
      const res = await instance.updateUser(result);
      expect(res).to.equal('Success');
      done();
    });
  });

  it('should remove an existing User', function(done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      email: 'test99@test.com'
    };
    let instance = new Users(data);
    let Update = instance.findUserToRemove();
    Update.then(async result => {
      const res = await instance.updateUser(result);
      expect(res).to.equal('Success');
      done();
    });
  });
});
