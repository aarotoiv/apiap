const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: {
      type: 'string'
    },
    brand: {
      type: 'string'
    },
    model: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['name', 'brand', 'model', 'description']
};

module.exports = ajv.compile(schema);