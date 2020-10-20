const joi = require('@hapi/joi');
const flight_code = new RegExp(/\b[a-zA-Z0-9]{5}/);

const schema = {
	query: {
		first_name: joi.string(),
		last_name: joi.string(),
		uuid_code: joi.string().pattern(flight_code),
		category: joi.array().items(joi.string())
	},
};

module.exports = {
	schema,
};
