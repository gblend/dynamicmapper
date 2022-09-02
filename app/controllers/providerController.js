'use strict';

const {BadRequestError, NotFoundError} = require('../lib/errors');
const {providerDataValidator, specificationValidator} = require('../lib/validator')
const {
	formatValidationError,
	adaptRequest,
	logger,
	StatusCodes,
	prepareLoadData,
} = require('../lib/utils');
const {DataSpecification} = require('../models/ProviderSpecification');
const {ProviderData} = require('../models/ProviderData');

const createSpecification = async (req, res) => {
	const {body, method, path} = adaptRequest(req);
	const providerId = body.providerId;

	const {error} = specificationValidator.validateDto(body);
	if (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			data: {errors: formatValidationError(error)}
		});
	}

	const isSpecificationExists = await DataSpecification.findOne({providerId});
	if (isSpecificationExists) {
		logger.info(`Data specification already exists for this provider: ${providerId} - ${method} - ${path}`);
		throw new BadRequestError(`Data specification already exists for this provider: ${providerId}`);
	}

	const specification = await DataSpecification.create(body);

	if (!specification) {
		logger.error(`Specification creation failed for provider: ${providerId} - ${method} - ${path}`);
		throw new BadRequestError(`Specification creation failed for provider: ${providerId}`);
	}

	logger.info(`Specification successfully created for provider: ${providerId} - ${method} - ${path}`)
	return res.status(StatusCodes.OK).json({
		message: 'Specification for provider created successfully',
		data: {
			specification
		}
	});
}

const loadData = async (req, res) => {
	const {body: payload, path, method} = adaptRequest(req);
	const providerId = payload.providerId;

	if (!providerId) {
		throw new BadRequestError('Invalid provider id');
	}

	const providerSpecification = await DataSpecification.findOne({providerId});
	if (!providerSpecification) {
		logger.info(`Provider specification does not exist - ${method} - ${path}`);
		throw new NotFoundError('Provider specification does not exist');
	}

	if (!providerSpecification.fields.length) {
		throw new BadRequestError('Invalid provider specification fields. Please update fields specification');
	}
	const {error} = providerDataValidator.validateDto(payload, providerSpecification.fields);
	if (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			data: {errors: formatValidationError(error)}
		});
	}

	const dataToLoad = prepareLoadData(payload)
	const providerData = await ProviderData.insertMany(dataToLoad);
	if (!providerData) {
		logger.error(`Provider data loading failed, providerId: ${providerId} - ${method} - ${path}`);
		throw new BadRequestError('Provider data loading failed');
	}

	logger.info(`Successfully loaded data for provider: ${providerId}`)
	return res.status(StatusCodes.OK).json({
		message: 'Successfully loaded data for provider',
		data: {
			providerData
		}
	});
}

module.exports = {
	loadData,
	createSpecification
}
