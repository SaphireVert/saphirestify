var assert = require("assert-plus");


function start(routePath, currentPath, config) {
  assert.optionalObject(config, "config");
  assert.string(routePath, "routePath");
  assert.string(currentPath, "currentPath");

  if (typeof config === "undefined"){
    config = require(`${currentPath}/config.js`)
  }

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
 * @function start - Starts the api
 * @param {String} [routePath] - Specify the path of the route folder
 * @param {String} [currentPath] - Specify the path of the current directory
 * @param {String} [config] - Specify the config for the api server
 * 
 */

module.exports.start = start;
