const errorHandler = require('../core/handlers/error.handler');
const schemaHandler = require('../core/handlers/schema.handler');
const response = require('../core/helpers/response.helper');

const auth = require('../middlewares/auth.middleware');

const Property = require('../models/property.model');
const propertySchema = require('../core/schemas/property.schema');

const { pick } = require('lodash');
const { Router } = require('express');
const multer = require('multer');

const router = Router();
const upload = multer({ dest: 'uploads/' });

const getBody = (body) => {
  return pick(body, [
    'name',
    'currency',
    'price',
    'description',
    'bathroom',
    'restroom',
    'parking',
    'pool',
    'airConditioner',
    'privateSecurity',
    'yard',
    'lat',
    'long',
    'user',
  ]);
};

router.post(
  '/',
  auth.authorization,
  schemaHandler.validate(propertySchema.POST),
  errorHandler.handleRequest(async (req, res) => {
    const property = getBody(req.body);
    const result = await Property.create(property);

    return response.request(201, 'Property created successfully', { _id: result._id }, res);
  })
);

router.put(
  '/:_id',
  auth.authorization,
  schemaHandler.validate(propertySchema.PUT),
  errorHandler.handleRequest(async (req, res) => {
    const property = getBody(req.body);
    delete property.user;

    const result = await Property.findByIdAndUpdate(req.params._id, property);

    return response.request(201, 'Property updated successfully', { _id: result._id }, res);
  })
);

router.get(
  '/',
  auth.authorization,
  errorHandler.handleRequest(async (req, res) => {
    const results = await Property.find({ user: req.user._id });

    return response.request(200, 'Properties found successfully', { data: results }, res);
  })
);

router.delete(
  '/:_id',
  auth.authorization,
  schemaHandler.validate(propertySchema.DELETE),
  errorHandler.handleRequest(async (req, res) => {
    const _id = req.params._id;

    await Property.findByIdAndDelete(_id);

    return response.request(200, 'Property deleted successfully', {}, res);
  })
);

module.exports = router;
