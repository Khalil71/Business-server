const mongoose = require('mongoose');
const { mongoDBURI } = require('./references');

module.exports = {
  mongoStart: function() {
    mongoose.connect(
      mongoDBURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
      function mongoConnect() {
        console.log('mongoose connection success'); // eslint-disable-line
      }
    );
  },
  dropCollection: function(done) {
    mongoose.connection.db.dropCollection('companies', () => {
      console.log('Companies collection dropped'); // eslint-disable-line
      done();
    });
  }
};
