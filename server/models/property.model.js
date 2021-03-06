const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  primaryImage: {
    type: String,
    required: true,
  },
  optionalImages: {
    type: String,
    required: true,
  },
});

propertySchema.methods.toJSON = function () {
  const property = this.toObject();
  delete property.password;

  return property;
};

module.exports = mongoose.model('Property', propertySchema);
