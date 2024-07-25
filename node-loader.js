var path = require("path");

module.exports = function(content) {
  const defaultConfig = {
    basePath: [],
    rewritePath: undefined,
    emit: true
  };

  const config = Object.assign(defaultConfig, this.query);
  const fileName = path.basename(this.resourcePath);

  if (config.emit) {
    if (this.emitFile) {
      this.emitFile(fileName, content, false);
    } else {
      throw new Error("emitFile function is not available");
    }
  }

  this.addDependency(this.resourcePath);

  let FilePath;

  if (config.rewritePath) {
    FilePath = `path.resolve(__dirname, "..", "..", "${config.rewritePath}", "${fileName}")`;
  }
  
  return `
  const path = require('path');
  const FilePath = ${FilePath};
  try {
    global.process.dlopen(module, FilePath);
  } catch (exception) {
    throw new Error('Cannot open ' + FilePath + ': ' + exception);
  }
  `;
};

module.exports.raw = true;
