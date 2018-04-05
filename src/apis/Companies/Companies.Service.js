var Companies = require('../../models/Companies');

function Company(data) {
  this.data = data;
}

Company.prototype.getAllCompanies = function () {
  return Companies.find()
    .then(function (res) {
      return res;
    })
    .catch(function () {
      return new Error('No companies Found!');
    });
};

Company.prototype.getCompany = function () {
  return Companies.findOne({ displayName: this.data.displayName })
    .then(function (res) {
      return res;
    })
    .catch(function () {
      return new Error('Company was not found!');
    });
};

Company.prototype.createCompany = function () {
  var company = new Companies({
    displayName: this.data.displayName,
    name: this.data.displayName.toLowerCase()
  });
  return company.save().then(function (res) {
    return res;
  });
};

Company.prototype.updateCompany = function () {
  return Companies.findOneAndUpdate(
    {
      displayName: this.data.displayName
    },
    {
      displayName: this.data.newDisplayName,
      name: this.data.newDisplayName.toLowerCase()
    }
  ).then(function (res) {
    if (res === null) {
      return 'Nothing was updated';
    }
    return 'Success';
  });
};

module.exports = Company;
