Object.defineProperty(exports, '__esModule', { value: true });

var yaml = require('js-yaml');

function yamlLoad(string) {
  return yaml.load(string);
}

exports.default = yamlLoad;
