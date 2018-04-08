/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');

const config = require('../config.json');
const App = require('../lib/App');

Promise.resolve()
    .then(() => new App(config))
    .then(app => app.start())
    .catch(error => {
        // We disable `console` checks here because `bunyan` loggers have not yet been initialised.
        // All other parts of the source code should rely on `bunyan` loggers and not `console`.
        /* eslint-disable no-console */

        console.error('An error occurred during API startup:');
        console.error(error);
    });
