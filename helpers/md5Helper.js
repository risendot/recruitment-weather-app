var md5 = require('md5');

/**
 * Returns md5 hashed password
 * @param {string} password
 * @returns {string}
 */
exports.hash = function (pass) {
    return md5(pass);
}

/**
 * Validates given password
 * @param {string} pass
 * @param {string} dbPass
 * @returns {Boolean}
 */
exports.checkPassword = function (pass, dbPass) {
    return md5(pass) === dbPass;
}



