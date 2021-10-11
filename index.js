var assert = require("assert-plus");
const RoutesListener = require("./lib/RoutesListener");
var path = require("path");

/**
 * 
 * An  object that can listen to all routes
 * 
 * @public
 * @function start - Starts the api
 * @param {String} [routePath] - Specify the path of the route folder
 * @param {String} [config] - Specify the config for the api server
 * 
 */
function start(routePath, config) {
  assert.optionalObject(config, "config");
  assert.string(routePath, "routePath");

  if (typeof config === "undefined"){
    config = require(`${path.resolve()}/config.js`);
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
  var routeListeners = new RoutesListener(server, routePath);
  routeListeners.start();
}


/**
 * 
 * If you already have a server instance, this will only check a specified route folder using the server object.
 * 
 * @public
 * @function hookup - Parse folder that contains route files
 * @param {Object} [options] - Specify the options
 * @param {String} [options.routesFolder] - Specify the path of the current directory
 * @param {Object} [options.server] - Specify the api server object
 * 
 */
function hookup(options) {
  var routeListeners = new RoutesListener(
    options.server,
    options.routesFolder,
  );
  routeListeners.start();
}

module.exports.start = start;
module.exports.hookup = hookup;
