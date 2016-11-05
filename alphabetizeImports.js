var constants = require('./importConstants');
var util = require('./importUtil');

var NEW_LINE_CHR = constants.NEW_LINE_CHR;

function importAlphabetizer(page) {
  var lines = page.split(NEW_LINE_CHR);
  //need to handle:
  //import, multiline import
  //require
  //absolute before relative
  //import before require
  //alphabetize by words in actual path
  var sortedLines = sortImports(lines);

  return sortedLines.join(NEW_LINE_CHR);
}

function sortImports(imports) {
  //imports is an array of import lines
  return imports.sort(util.importBeforeRequire);
}

module.exports = importAlphabetizer;
