const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    fname: {
      type: 'string'
    },
    lname: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    token: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['fname', 'lname', 'username', 'password', 'token']
};

module.exports = ajv.compile(schema);