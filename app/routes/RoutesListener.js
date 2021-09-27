const fs = require('fs');

class RoutesListener {
  constructor(server) {
    this.server = server;
    this.classes = this.getClasses();
  }

  async start() {
    this.loadAllMethodsFromRouteFiles(this.classes, this.server);
  }

  addRouteListener(route, method, obj) {
    this.addListener(route, method, obj);
  }

  getClasses() {
    var filesList = fs.readdirSync("./routes/endpoints");

    var classList = []
    var test = "TOTO"
    filesList.forEach((element, i) => {
      element = element.substring(0, element.length - 3);
      classList.push(element);
    })
    return classList
  }

  addListener(route, methode, obj) {
    this.server[methode](route.toLowerCase(), function (req, res, next) {
      res.send(obj[methode](), next);
    });
  }

  loadAllMethodsFromRouteFiles() {
    var classList = [];
    this.classes.forEach((fileName, i) => {
      const classImport = require("./endpoints/" + fileName);
      var classObj = new classImport(this.server);
      this.addMethodsFromClass(fileName, classObj);
    });
  }

  addMethodsFromClass(route, classObj) {
    let httpMethods = this.getAllFuncsFromObject(classObj);
    httpMethods.forEach((element) => {
      this.addRouteListener("/" + route, element, classObj);
    });
  }

  getAllFuncsFromObject(objToCheck) {
      var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(objToCheck));
      var avoidValues = ["constructor", "start"];

      avoidValues.forEach(function(element, i) {
          var index = propertyNames.indexOf(element)
          if (propertyNames.includes(element)) {
              propertyNames.splice(index, 1);
          }
      })
      return propertyNames
  }
}

module.exports = RoutesListener;
