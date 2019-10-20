/* eslint-disable one-var */
const { expect } = require('chai'),
  mongoose = require('mongoose'),
  Company = require('../apis/Companies/Companies.Service'),
  Workspace = require('../apis/Workspaces/Workspaces.Service'),
  Users = require('../apis/Users/Users.Service');

describe('Users Tests', () => {
  before((done) => {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business', { useNewUrlParser: true });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', () => {
      console.log('We are connected to Business database!'); // eslint-disable-line
      done();
    });
  });

  before((done) => {
    mongoose.connection.db.dropCollection('companies', () => {
      console.log('Companies collection dropped'); // eslint-disable-line
      done();
    });
  });

  it('should create a new Company', (done) => {
    let data = { displayName: 'Google' },
      instance = new Company(data),
      Create = instance.createCompany();
    Create.then((result) => {
      expect(result.displayName).to.equal(data.displayName);
      done();
    });
  });

  it('should create a new Workspace', (done) => {
    let data = { companyDisplayName: 'Google', workspaceDisplayName: 'SomeWorkSpace' },
      instance = new Workspace(data),
      Create = instance.createWorkspace();
    Create.then((result) => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should create a new User', (done) => {
    let data = {
        companyDisplayName: 'Google',
        workspaceDisplayName: 'SomeWorkSpace',
        email: 'test@test.com',
        role: 'basic'
      },
      instance = new Users(data),
      Create = instance.createUser();
    Create.then((result) => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should update an existing User', (done) => {
    let data = {
        companyDisplayName: 'Google',
        workspaceDisplayName: 'SomeWorkSpace',
        email: 'test@test.com',
        newRole: 'admin',
        newEmail: 'test99@test.com'
      },
      instance = new Users(data),
      Update = instance.findUser();
    Update.then(async (result) => {
      const res = await instance.updateUser(result);
      expect(res).to.equal('Success');
      done();
    });
  });

  it('should remove an existing User', (done) => {
    let data = {
        companyDisplayName: 'Google',
        workspaceDisplayName: 'SomeWorkSpace',
        email: 'test99@test.com'
      },
      instance = new Users(data),
      Update = instance.findUserToRemove();
    Update.then(async (result) => {
      const res = await instance.updateUser(result);
      expect(res).to.equal('Success');
      done();
    });
  });
});
