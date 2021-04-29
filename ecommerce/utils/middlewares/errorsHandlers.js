const debug = require("debug")("app:error")
const { config } = require("../../config/index")
const boom = require("boom")
const isRequestAjaxOrApi = require("../isRequestAjaxOrApi.js");

// Verify if the environment is development and return the stack of the error
function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack}   // Object.assign({}, err, stack)
    }
}

function logErrors(err, req, res, next) {
    debug(err.stack)
    next(err)
}

// Verify if the error is already wrapped to boom
function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

// function clientErrorHandler(err, req, res, next) {
//     // Catch errors for AJAX request from a client via API
//     // It is identified by the header that has an xml-http request
//     if (req.xhr) {
//         res.status(500).json({ err: err.message })
//     } else {
//         next(err)
//     }
// }

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    // catch errors for AJAX request or if an error ocurrs while streaming
    if (isRequestAjaxOrApi(req) || res.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    } else {
        next(err);
    }
}

// function errorHandler(err, req, res, next) {
//     // catch errors while streaming
//     if (res.headersSent) {
//         next(err)   // Call the native express middleware
//     }

//     // In the production environment, you don't want the client to be able to see the error stack.
//     if (!config.dev) {
//         delete err.stack
//     }

//     res.status(err.status || 500)
//     res.render("error", { error: err })
// }

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;
  
    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
};