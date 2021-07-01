const Companies = require('../../models/Companies');

class Company {
  constructor(data) {
    this.data = data;
  }
  async getAllCompanies() {
    try {
      const res = await Companies.find();
      return res;
    } catch (e) {
      return e;
    }
  }
  async getCompany() {
    try {
      const res = await Companies.findOne({ displayName: this.data.displayName });
      return res;
    } catch (e) {
      return e;
    }
  }
  async createCompany() {
    let company = new Companies({
      displayName: this.data.displayName,
      name: this.data.displayName.toLowerCase()
    });
    try {
      const res = await company.save();
      return res;
    } catch (e) {
      return e;
    }
  }
  async updateCompany() {
    let res;
    try {
      res = await Companies.findOneAndUpdate(
        {
          displayName: this.data.displayName
        },
        {
          displayName: this.data.newDisplayName,
          name: this.data.newDisplayName.toLowerCase()
        }
      );
    } catch (e) {
      return e;
    }
    if (!res) {
      return 'Nothing was updated';
    }
    return 'Success';
  }
}

module.exports = Company;
