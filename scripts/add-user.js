/**
 * Creates a new user interactively.
 *
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const prompt = require('prompt-sync')({sigint: true});
const Promise = require('bluebird');

const rawConfig= require('../config.json');
const ApiDB = require('../lib/db/ApiDB');
const V1Auth = require('../lib/v1/V1Auth');
const Util = require('../lib/Util');

/** @type {ApiConfig} */
const config = Util.validateAppConfig(rawConfig);
const logger = Util.createLogger(`${config.appName}-add-user-script`);
config.logger = logger;
const apiDb = new ApiDB(config);

Promise.resolve()
    .then(() => logger.info('Testing API DB connection...'))
    .then(() => apiDb.checkConnection())
    .then(() => logger.info('Connection successful!'))
    .then(() => {
        const data = {};
        logger.info('Enter user details:');
        data.firstName = prompt('First name: ');
        data.lastName = prompt('Last name: ');
        data.email = prompt('Email: ');
        data.passwordHash = V1Auth.hashPassword(prompt('Password: '));
        logger.info(data.passwordHash, data.passwordHash.length);
        return apiDb.createStaffUser(data);
    })
    .then(user => {
        logger.info('User created successfully! See user data below.');
        Util.prettyPrint(user, logger.info.bind(logger));
    })
    .catch(error => {
        logger.error(error);
    });
