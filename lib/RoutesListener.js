const fs = require("fs");
class RoutesListener {
  constructor(server, routePath) {
    this.server = server;
    this.routePath = routePath;
    this.modulePath = require("path").resolve();
  }

  async start() {
    this.loadRoutes();
  }

  loadRoutes() {
    var classList = [];
    let filesName = this.getRouteFilesName();
    filesName.forEach((fileName, i) => {
      const classImport = require(`${this.modulePath}/${this.routePath}/${fileName}`);
      var classObj = new classImport(this.server);
      this.addHttpMethods(fileName, classObj);
    });
  }

  addHttpMethods(route, classObj) {
    let httpMethods = this.getMethodsFromObject(classObj);
    httpMethods.forEach((element) => {
      this.addListener("/" + route, element, classObj);
    });
  }

  addListener(route, methode, obj) {
    this.server[methode](route.toLowerCase(), function (req, res, next) {
      res.send(obj[methode](req));
      return next();
    });
  }

  getRouteFilesName() {
    var filesList = fs.readdirSync(`${this.modulePath}/${this.routePath}`);
    var classList = [];
    filesList.forEach((element, i) => {
      element = element.substring(0, element.length - 3);
      classList.push(element);
    });
    return classList;
  }

  getMethodsFromObject(objToCheck) {
    var propertyNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(objToCheck)
    );
    var avoidValues = ["constructor", "start"];

    avoidValues.forEach(function (element, i) {
      var index = propertyNames.indexOf(element);
      if (propertyNames.includes(element)) {
        propertyNames.splice(index, 1);
      }
    });
    return propertyNames;
  }
}

module.exports = RoutesListener;
