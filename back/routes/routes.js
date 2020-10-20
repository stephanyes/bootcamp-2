const express = require('express');
const router = express.Router();
const { validationPreHandler } = require('../utils/validation_handler');
const { schema: passengers } = require('../utils/schemas/passenger_schema');
const { schema: packages } = require('../utils/schemas/package_schema');
const { schema: search } = require('../utils/schemas/search_id_schema');
const { AirportController } = require('../controller/airport_controller');
const controller = new AirportController();


router.post(
  '/passengers',
  validationPreHandler({ schema: passengers.query, check: 'body' }),
  controller.addPassenger,
);

router.post(
  '/packages',
  validationPreHandler({ schema: packages.query, check: 'body' }),
  controller.addNewPackage,
);

router.get(
  '/passengers',
  controller.getAllPassengers
);
router.get(
  '/passengers/:search_id',
  validationPreHandler({schema: search.query, check: 'params'}),
  controller.getPassengerById
);

router.delete(
  '/passengers/:search_id',
  validationPreHandler({schema: search.query, check: 'params'}),
  controller.removePassengerById
);

module.exports = router;