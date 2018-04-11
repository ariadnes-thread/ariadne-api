// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var lib_grpc_planner_pb = require('../../lib/grpc/planner_pb.js');

function serialize_JsonReply(arg) {
  if (!(arg instanceof lib_grpc_planner_pb.JsonReply)) {
    throw new Error('Expected argument of type JsonReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_JsonReply(buffer_arg) {
  return lib_grpc_planner_pb.JsonReply.deserializeBinary(new Uint8Array(buffer_arg));
}


// The route planner service definition.
var RoutePlannerService = exports.RoutePlannerService = {
  // Plan a route
  planRoute: {
    path: '/RoutePlanner/PlanRoute',
    requestStream: false,
    responseStream: false,
    requestType: lib_grpc_planner_pb.JsonReply,
    responseType: lib_grpc_planner_pb.JsonReply,
    requestSerialize: serialize_JsonReply,
    requestDeserialize: deserialize_JsonReply,
    responseSerialize: serialize_JsonReply,
    responseDeserialize: deserialize_JsonReply,
  },
};

exports.RoutePlannerClient = grpc.makeGenericClientConstructor(RoutePlannerService);
