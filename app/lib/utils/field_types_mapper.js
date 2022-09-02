const Joi = require('joi');

module.exports.allowedFieldTypesMapper = ({fields}) => {
	const mappedFields = {};

	fields.forEach(element => {
		mappedFields[element] = [
			Joi.string(),
			Joi.number(),
			Joi.date().timestamp('unix'),
		]
	});

	return mappedFields;
}
