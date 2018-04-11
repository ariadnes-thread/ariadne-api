/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');
const grpc = require('grpc');

const messages = require('./grpc/planner_pb');
const services = require('./grpc/planner_grpc_pb');

class RoutePlannerClient {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Initialise a gRPC RoutePlanner client
     * @returns {Promise<number>} Port on which connection was established
     */
    connect() {
        return Promise.resolve(`localhost:${this.config.routePlannerPort}`)
            .then(address => new services.RoutePlannerClient(address, grpc.credentials.createInsecure()))
            .then(client => this.client = client)
            .then(() => this.config.routePlannerPort);
    }

    /**
     * @param {object[]} constraints
     * @returns {Promise<object[]>} Route returned by RoutePlanner over gRPC
     */
    planRoute(constraints) {
        if (constraints) constraints = null;
        return new Promise((resolve, reject) => {
            try {
                const message = new messages.JsonReply({jsonData: JSON.stringify(constraints)});
                this.client.planRoute(message, (err, response) => {
                    if (err) return reject(err);
                    resolve(JSON.parse(response.array[0]).route);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

}

module.exports = RoutePlannerClient;
