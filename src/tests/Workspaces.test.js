/* eslint-disable indent */
/* eslint-disable one-var */
const { expect } = require('chai');
const mongoose = require('mongoose');
const Company = require('../apis/Companies/Companies.Service');
const Workspace = require('../apis/Workspaces/Workspaces.Service');

describe('Workspace Tests', () => {
  before((done) => {
    mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', () => {
      console.log('We are connected to Business database!'); // eslint-disable-line
      return done();
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

  it('should get update 1 workspace', (done) => {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      newWorkspaceDisplayName: 'NewWorkspace'
    },
     instance = new Workspace(data),
     getOne = instance.updateWorkspace();
    getOne.then((result) => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should find 1 specific company in the collection', (done) => {
    let data = { companyDisplayName: 'Google', workspaceDisplayName: 'NewWorkspace' },
     instance = new Workspace(data),
     updateOne = instance.findWorkspace();
    updateOne.then((result) => {
      expect(result.workspaces[0].displayName).to.equal(data.workspaceDisplayName);
      done();
    });
  });
});
