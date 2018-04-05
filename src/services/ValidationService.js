var valid = {
  number: /^\d+$/,
  displayName: /([A-Z]\w*\W*)/,
  email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  roles: /^(admin|basic)$/
};

module.exports = valid;
