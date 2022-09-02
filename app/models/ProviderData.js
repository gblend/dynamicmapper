'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProviderDataSchema = new Schema({
	providerId: {
		type: Number,
		trim: true,
		required: true
	}
}, {timestamps: true, strict: false});

ProviderDataSchema.index({providerId: 1}, {unique: false});

const ProviderData = mongoose.model('ProviderData', ProviderDataSchema, 'providerdata');

module.exports = {
	ProviderData
};
