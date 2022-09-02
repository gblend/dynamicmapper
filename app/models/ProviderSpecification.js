'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecificationSchema = new Schema({
	providerId: {
		type: Number,
		trim: true,
		unique: true,
		required: true
	},
	fields: [{
		type: String,
		trim: true
	}]
}, {timestamps: true});

SpecificationSchema.index({providerId: 1}, {unique: true});

const DataSpecification = mongoose.model('DataSpecification', SpecificationSchema, 'dataspecification');

module.exports = {
	DataSpecification
};
