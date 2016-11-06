var constants = require('./importConstants');

var NEW_LINE_CHR = constants.NEW_LINE_CHR;
var REQUIRE_PATTERN = constants.REQUIRE_PATTERN;
var IMPORT_PATTERN = constants.IMPORT_PATTERN;

var GET_PATH_PATTERN = constants.GET_PATH_PATTERN
var GET_SINGLE_QUOTE_PATH_PATTERN = constants.GET_SINGLE_QUOTE_PATH_PATTERN;
var GET_DOUBLE_QUOTE_PATH_PATTERN = constants.GET_DOUBLE_QUOTE_PATH_PATTERN;
var GET_REL_PATH_START_PATTERN = constants.GET_REL_PATH_START_PATTERN;

var getStartPattern = new RegExp(GET_REL_PATH_START_PATTERN, "i");
var pathReplacePattern = new RegExp(GET_REL_PATH_START_PATTERN, "g");

function isImport(element) {
  return IMPORT_PATTERN.test(element);
}

function isRequire(element) {
  return REQUIRE_PATTERN.test(element);
}

function getPathContent(s) {
  if (s.length) {
    var requirePath = getRelativePath(s);

    if (requirePath) {
      return requirePath;
    } else {
      var singlePath = s.match(GET_SINGLE_QUOTE_PATH_PATTERN);
      var doublePath = s.match(GET_DOUBLE_QUOTE_PATH_PATTERN);
      var match = singlePath || doublePath;


      if (match) {
        return match[1];
      }
    }
  }

  return "";
}

function getRelativePath(line) {
  var path = line.match(getStartPattern);

  if (path) {
    var index = path.index;
    if (typeof index === "number") {
      var justPath = line.slice(index);
      return justPath.replace(pathReplacePattern, "");
    }
  }

  return "";
}

function sortByPath(l, m) {
  //sort by path regardless of whether require or import

  var lIsRelative = getStartPattern.test(l);
  var mIsRelative = getStartPattern.test(m);

  if (lIsRelative && mIsRelative || !lIsRelative && !mIsRelative) {
    var lContent = getPathContent(l);
    var mContent = getPathContent(m);

    if (lContent < mContent) {
      return -1;
    }

    if (lContent > mContent) {
      return 1;
    }

    return 0;
  } else if (lIsRelative) {
    return 1
  } else {
    return -1;
  }


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
  getPathContent: getPathContent,
  getRelativePath: getRelativePath,
};

module.exports = importUtil;
