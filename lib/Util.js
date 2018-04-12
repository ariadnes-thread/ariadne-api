/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const bunyanFormat = require('bunyan-format');
const bunyan = require('bunyan');
const Joi = require('joi');

class Util {

    /**
     * @param {string} name
     * @param {string} outputMode
     * @return {Logger}
     */
    static createLogger(name = 'untitled-app', outputMode = 'short') {
        return bunyan.createLogger({name: name, stream: bunyanFormat({outputMode})});
    }

    /**
     * Used to validate configs (or any objects for that matter) using a Joi schema.
     * See `Util.validateAppConfig()` method for usage example.
     *
     * @see https://github.com/hapijs/joi
     * @param {object} schema
     * @param {object} config
     * @return {object}
     */
    static validateConfig(schema, config) {
        let schemaObject = Joi.object().required().keys(schema).label('config');
        const result = Joi.validate(config, schemaObject);
        if (result.error) {
            let errorString = result.error.details.map(detail => detail.message).join(', ');
            throw new Error(`Config validation error: ${errorString}.`);
        }
        return result.value;
    }

    /**
     * @param config
     * @returns {ApiConfig}
     */
    static validateAppConfig(config) {
        let appConfigSchema = {
            appName: Joi.string().required(),
            appSecret: Joi.string().required(),
            apiUrl: Joi.string().required(),
            apiDbUrl: Joi.string().required(),
            gisDbUrl: Joi.string().required(),
            tokenExpiration: Joi.number().required().min(0),
            apiPort: Joi.number().required().min(1025).max(49150),
            routePlannerPort: Joi.number().required().min(1025).max(49150),
        };
        return Util.validateConfig(appConfigSchema, config);
    }

}

module.exports = Util;
