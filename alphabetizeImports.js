var NEW_LINE_CHR = "\n";
var REQUIRE_PATTERN = "require";
var IMPORT_PATTERN = "import";

function importAlphabetizer(page) {
  var lines = page.split(NEW_LINE_CHR);

  //need to handle:
  //import, multiline import
  //require
  //absolute before relative
  //import before require
  //alphabetize by words in actual path
  return page;
}

function sortImports(imports) {
  //imports is an array of import lines
  imports.sort()
}

function importBeforeRequire(a, b) {
  var aIsRequire = a.indexOf(REQUIRE_PATTERN) > -1;
  var bIsRequire = b.indexOf(REQUIRE_PATTERN) > -1;
}

module.exports = importAlphabetizer;
