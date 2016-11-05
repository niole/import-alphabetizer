var constants = require('./importConstants');
var util = require('./importUtil');

var NEW_LINE_CHR = constants.NEW_LINE_CHR;

//need to handle:
//import, multiline import
//require
//absolute before relative
//import before require
//alphabetize by words in actual path

function importAlphabetizer(page) {
  var lines = page.split(NEW_LINE_CHR);

  var sectionedLines = util.separateImports(lines);
  var sortedImports = util.sortDependencies(sectionedLines.imports);
  var sortedRequires = util.sortDependencies(sectionedLines.requires);

  var sortedLines = sortedImports.concat(sortedRequires, sectionedLines.code);

  return sortedLines.join(NEW_LINE_CHR);
}

module.exports = importAlphabetizer;
