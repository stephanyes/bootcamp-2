const joi = require('@hapi/joi');

const schema = {
	query: {
		passengerId: joi.number(),
		category: joi.array().items(joi.string())
	},
};

module.exports = {
	schema,
};
