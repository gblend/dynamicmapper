'use strict';

module.exports.adaptRequest = (req = {}) => {
    return Object.freeze({
        path: req.path,
        method: req.method,
        body: req.body,
        queryParams: req.query,
        pathParams: req.params,
    })
}
