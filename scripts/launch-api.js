/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const App = require('../lib/App');
const config = require('../config.json');

let app = new App(config);
app.start();
