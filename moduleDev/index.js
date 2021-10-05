var assert = require("assert-plus");


function startApi(config, routePath, currentPath) {
  assert.object(config, "config");
  assert.string(routePath, "routePath");
  assert.string(currentPath, "currentPath");

  /**
   * Module Dependencies
   */
  const restify = require("restify");
  // const mongoose = require('mongoose');
  const restifyPlugins = require("restify-plugins");
  /**
   * Initialize Server
   */
  const server = restify.createServer({
    name: config.server.name,
    version: config.server.version,
  });

  /**
   * Middleware
   */
  server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
  server.use(restifyPlugins.acceptParser(server.acceptable));
  server.use(restifyPlugins.queryParser({ mapParams: true }));
  server.use(restifyPlugins.fullResponse());
  server.use(restify.plugins.queryParser());
  
  /**
   * Start Server, Connect to DB & Require Routes
   */
  server.listen(config.port, () => {
    console.log("%s listening at %s", server.name, server.url);
  });

  /**
   * Launching module
   */
  const RoutesListener = require("./lib/RoutesListener");
  var routeListeners = new RoutesListener(server, routePath, currentPath);
  routeListeners.start();
}

/**
 * 
 * An  object that can listen to all routes
 * 
 * @public
 * @function startApi - Starts the api
 * @param {String} [config] - Specify theconfig for the api server
 * @param {String} [routePath] - Specify the path of the route folder
 * @param {String} [currentPath] - Specify the path of the current directory
 * 
 */

module.exports.startApi = startApi;
