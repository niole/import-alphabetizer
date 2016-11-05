var constants = require('./importConstants');

var NEW_LINE_CHR = constants.NEW_LINE_CHR;
var REQUIRE_PATTERN = constants.REQUIRE_PATTERN;
var IMPORT_PATTERN = constants.IMPORT_PATTERN;

var GET_PATH_PATTERN = constants.GET_PATH_PATTERN
var GET_SINGLE_QUOTE_PATH_PATTERN = constants.GET_SINGLE_QUOTE_PATH_PATTERN;
var GET_DOUBLE_QUOTE_PATH_PATTERN = constants.GET_DOUBLE_QUOTE_PATH_PATTERN;


function isImport(element) {
  return IMPORT_PATTERN.test(element);
}

function isRequire(element) {
  return REQUIRE_PATTERN.test(element);
}

function getPathContent(acc, s) {
  if (s.length) {
    var requirePath = s.match(GET_PATH_PATTERN);
    var singlePath = s.match(GET_SINGLE_QUOTE_PATH_PATTERN);
    var doublePath = s.match(GET_DOUBLE_QUOTE_PATH_PATTERN);
    var match = requirePath || singlePath || doublePath;

    if (match) {
      var index = match.index;
      var toKeep = match[1];
      var nextIndex = index + match[0].length;

      acc += toKeep;
      if (nextIndex < s.length) {
        return getPathContent(acc, s.slice(nextIndex));
      }
    }
  }

  return acc;
}

function sortByPath(l, m) {
  //sort by path regardless of whether require or import
  var lContent = getPathContent("", l);
  var mContent = getPathContent("", m);

  if (lContent < mContent) {
    return -1;
  }

  if (lContent > mContent) {
    return 1;
  }

  return 0;
}

function sortDependencies(lines) {
  return lines.sort(sortByPath);
}

function separateImports(lines) {
  //(Lines[]) => {imports: Lines[], requires: Lines[], code: Lines[]}
  //slice out imports from rest of code and return the two
  return lines.reduce(function(acc, nextLine) {
    if (isImport(nextLine)) {
        acc.imports.push(nextLine);
    } else if (isRequire(nextLine)) {
        acc.requires.push(nextLine);
    } else {
      acc.code.push(nextLine);
    }
    return acc;
  }, {imports: [], requires: [], code: []});
}

var importUtil = {
  sortDependencies: sortDependencies,
  separateImports: separateImports,
  isImport: isImport,
  isRequire: isRequire,
};

module.exports = importUtil;
