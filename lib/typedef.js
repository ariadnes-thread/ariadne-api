/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

/**
 * Raw config as found in `config.example.json` (before processing).
 *
 * @typedef {object} RawApiConfig
 * @property {string} appName
 * @property {string} appSecret
 * @property {string} apiUrl
 * @property {string} apiDbUrl
 * @property {string} gisDbUrl
 * @property {number} tokenExpiration
 * @property {number} routePlannerPort
 * @property {number} apiPort
 */

/**
 * Config after processing, expected after config was validated and augmented (e.g. by App class).
 *
 * @typedef {RawApiConfig} ApiConfig
 * @property {Logger} logger
 * @property {RoutePlannerClient} routePlannerClient
 * @property {ApiDB} apiDb
 * @property {GisDB} gisDb
 */

/**
 * @typedef {object} UserData
 * @property {string} userId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * @typedef {object} TokenData
 * @property {string} accessToken
 * @property {UserData} userData
 */
