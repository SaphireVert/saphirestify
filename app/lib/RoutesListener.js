const fs = require("fs");

class RoutesListener {
  constructor(server) {
    this.server = server;
    this.classes = this.getClasses();
  }

  async start() {
    this.loadAllMethodsFromRouteFiles(this.classes, this.server);
  }

  getClasses() {
    var filesList = fs.readdirSync("./routes/endpoints");

    var classList = [];
    filesList.forEach((element, i) => {
      element = element.substring(0, element.length - 3);
      classList.push(element);
    });
    return classList;
  }

  addListener(route, methode, obj) {
    this.server[methode](route.toLowerCase(), function (req, res, next) {
      res.send(obj[methode](), next);
    });
  }

  loadAllMethodsFromRouteFiles() {
    var classList = [];
    this.classes.forEach((fileName, i) => {
      const classImport = require("../routes/endpoints/" + fileName);
      var classObj = new classImport(this.server);
      this.addMethodsFromClass(fileName, classObj);
    });
  }

  addMethodsFromClass(route, classObj) {
    let httpMethods = this.getAllFuncsFromObject(classObj);
    httpMethods.forEach((element) => {
      this.addListener("/" + route, element, classObj);
    });
  }

  getAllFuncsFromObject(objToCheck) {
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
