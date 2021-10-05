/**
 * Module Dependencies
 */
 const config = require('./config');
 const restify = require('restify');
//  const mongoose = require('mongoose');
 const restifyPlugins = require('restify-plugins');
 /**
   * Initialize Server
   */
 const server = restify.createServer({
   name: config.name,
   version: config.version,
 });



 /**
   * Middleware
   */
 server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
 server.use(restifyPlugins.acceptParser(server.acceptable));
 server.use(restifyPlugins.queryParser({ mapParams: true }));
 server.use(restifyPlugins.fullResponse());
 /**
   * Start Server, Connect to DB & Require Routes
   */
 server.listen(config.port, () => {
    console.log('%s listening at %s', server.name, server.url);
 });

const RoutesListener = require("./lib/RoutesListener");
var api = new RoutesListener(server);
api.start();

server.use(restify.plugins.queryParser());
