const Joi = require('joi');

const specificationValidator = {
	validateDto: (payload) => {
		const validSchema = Joi.object({
			providerId: Joi.number().required(),
			fields: Joi.array().items(Joi.string()).min(1).unique().required()
		});

		return validSchema.validate(payload);
	}
}

module.exports = {
	specificationValidator,
}
