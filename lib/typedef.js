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
 * @property {string} dbUrl
 * @property {number} tokenExpiration
 * @property {number} port
 */

/**
 * Config after processing, expected after config was validated and augmented (e.g. by App class).
 *
 * @typedef {RawApiConfig} ApiConfig
 * @property {Logger} logger
 */
