const joi = require('@hapi/joi');
const flight_code = new RegExp(/\b[a-zA-Z0-9]{5}/);

const schema = {
	query: {
		search_id: joi.string()
		// search_id: joi.string().pattern(flight_code).required()
	},
};

module.exports = {
	schema,
};
