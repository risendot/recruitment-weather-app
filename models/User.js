var dbConfig = require('../dbConfig');
var pg = require('pg');

var pool = new pg.Pool(dbConfig.pgConnection);

var noCallbackException = 'Model callback is not provided';

exports.get = function (login, password, email, callback) {
    if (typeof callback !== 'function') {
        throw noCallbackException;
    }

    pool.connect(function (err, client, done) {
        client.query('SELECT * FROM auth.user WHERE login = $1 AND password = $2 AND email = $3', [login, password, email], function (err, result) {
            if (err) {
                callback(err);
                done();
            }

            callback(err, result.rows[0]);
            done();
        });
    });
};

exports.create = function (login, password, email, callback) {
    if (typeof callback !== 'function') {
        throw noCallbackException;
    }

    pool.connect(function (err, client, done) {
        client.query('INSERT INTO auth.user (login, password, email) VALUES ($1, $2, $3)', [login, password, email], function (err, result) {
            if (err) {
                callback(err);
                done();
            }
            callback(err, result.rows[0]);
            done();
        });
    });
};






