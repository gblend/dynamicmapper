'use strict';

const {BadRequestError} = require('../lib/errors');
const {specificationValidator} = require('../lib/validator')
const {
	formatValidationError,
	adaptRequest,
	logger,
	StatusCodes,
} = require('../lib/utils');
const {DataSpecification} = require('../models/ProviderSpecification');

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

module.exports = {
	createSpecification
}
