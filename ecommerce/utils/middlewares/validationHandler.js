const Joi = require("joi")
const boom = require("boom")

function validate(schema, data) {
    const { error, value } = schema.validate(data)
    return error
}

function validationHandler(schema, check = "body") {    // Check body by default
    return function(req, res, next) {
        const error = validate(schema, req[check])
        error ? next(boom.badRequest(error)) : next()
    }
}

module.exports = validationHandler;