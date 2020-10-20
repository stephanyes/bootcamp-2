const joi = require("@hapi/joi")
const { throwError } = require('./throwError');

function validate(data, schema) {
	const { error } = joi.object(schema).validate(data);
	return error;
}

function validationPreHandler({ schema, check = 'body' }) {
	return (req, res, next) => {
		const error = validate(req[check], schema);
		if (error) {
			const { details } = error;
			const message = details.map(i => i.message).join(',');
			return next(throwError({
				message: message,
				statusCode: 400,
			}));
    }
    
		return next();
	};
}

module.exports = {
	validationPreHandler,
};
