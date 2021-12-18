const { BadRequest } = require('http-errors');

const validation = (schema) => {
    return (req, res, next) => {
        const error = schema.validate(req.body);

        if (Object.keys({ ...req.body }).length === 0 || error) {
            throw new BadRequest('Missing fields or bad data');
        }
    }
}

module.exports = validation;