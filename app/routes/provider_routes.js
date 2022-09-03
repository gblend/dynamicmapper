'use strict';

const router = require('express').Router();

const {loadData, filterData, createSpecification} = require('../controllers/providerController');

router.route('/data').post(loadData);
router.route('/specification').post(createSpecification);
router.route('/filter/:providerId').get(filterData);

module.exports = router;
