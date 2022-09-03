const Joi = require('joi');
const {allowedFieldTypesMapper} = require('../lib/utils');

const specificationValidator = {
	validateDto: (payload) => {
		const validSchema = Joi.object({
			providerId: Joi.number().required(),
			fields: Joi.array().items(Joi.string()).min(1).unique().required()
		});

		return validSchema.validate(payload);
	}
}

const providerDataValidator = {
	validateDto: (payload, fields) => {
		const allowedDataSchema = allowedFieldTypesMapper({fields});

		// validate payload data items key length against data specification length for the given provider id length
		const allowedDataKeyLengthSchema = Joi.array().items(Joi.object().keys().length(Object.keys(allowedDataSchema).length));
		const isLengthMismatchError = allowedDataKeyLengthSchema.validate(payload.data);

		if (!isLengthMismatchError.error) {
			const validSchema = Joi.object({
				providerId: Joi.number().required(),
				data: Joi.array().items(allowedDataSchema).min(1)
			});

			// validate data items keys and data types against data specification for the given provider id.
			return validSchema.validate(payload);
		}

		return isLengthMismatchError;
	}
}

module.exports = {
	specificationValidator,
	providerDataValidator
}
