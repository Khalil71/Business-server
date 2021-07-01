const { expect } = require('chai');
const { mongoStart, dropCollection } = require('../src/services/templates');

const Company = require('../src/apis/Companies/Companies.Service');
const Workspace = require('../src/apis/Workspaces/Workspaces.Service');

describe('Workspace Tests', function() {
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

  it('should get update 1 workspace', function(done) {
    let data = {
      companyDisplayName: 'Google',
      workspaceDisplayName: 'SomeWorkSpace',
      newWorkspaceDisplayName: 'NewWorkspace'
    };
    let instance = new Workspace(data);
    let getOne = instance.updateWorkspace();
    getOne.then(result => {
      expect(result).to.equal('Success');
      done();
    });
  });

  it('should find 1 specific company in the collection', function(done) {
    let data = { companyDisplayName: 'Google', workspaceDisplayName: 'NewWorkspace' };
    let instance = new Workspace(data);
    let updateOne = instance.findWorkspace();
    updateOne.then(result => {
      expect(result.workspaces[0].displayName).to.equal(data.workspaceDisplayName);
      done();
    });
  });
});
