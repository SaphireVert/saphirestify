var path = require("path");
var fs = require("fs");
const readdir = require("@folder/readdir");

module.exports = async (
  server,
  relativeRouteFolder,
  parseChar,
  argSeparator
) => {
  const options = {
    recursive: true,
    objects: true,
    nodir: true,
    onFile: (file) => {
      var routePath = file.path.substring(
        relativeRouteFolder.length + path.resolve().length + 1,
        file.path.length - 3
      );
      const regex = new RegExp(parseChar, "ig");
      routePath = routePath.replace(regex, argSeparator + ":");
      require(file.path)(server, routePath);
    },
  };
  readdir(`${path.resolve()}/${relativeRouteFolder}`, options);
};
