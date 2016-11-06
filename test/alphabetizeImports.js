var importAlphabetizer = require('../alphabetizeImports');
var assert = require('assert');
var constants = require('../importConstants');
var fixtures = require('./fixtures');
var testUtil = require('./testUtil');
var util = require('../importUtil');

var NEW_LINE_CHR = constants.NEW_LINE_CHR;

describe("alphabetizeImports", function() {
  var code = fixtures.code;
  var requires = fixtures.requires;
  var imports = fixtures.imports;
  var file = '';
  var originalSectionedLines = {
    code: [],
    imports: [],
    requires: []
  };

  beforeEach(function() {
    file = testUtil.shuffleArray(code.concat(imports, requires), [], 0).join(NEW_LINE_CHR);
    originalSectionedLines = util.separateImports(file.split(NEW_LINE_CHR));
  });

  it('should return page with imports first', function() {
    var actual = importAlphabetizer(file);
    var firstLine = actual.split(NEW_LINE_CHR)[0];
    assert(util.isImport(firstLine), "first line should be an import");
  });

  it('should always give same sorted dependencies, no matter how file is shuffled', function() {
      var file1 = importAlphabetizer(testUtil.shuffleArray(code.concat(imports, requires), [], 0).join(NEW_LINE_CHR));
      var file2 = importAlphabetizer(testUtil.shuffleArray(code.concat(imports, requires), [], 0).join(NEW_LINE_CHR));
      var imports1 = util.separateImports(file1.split(NEW_LINE_CHR));
      var imports2 = util.separateImports(file2.split(NEW_LINE_CHR));

      assert.deepEqual(imports1.imports, imports2.imports, "imports should be the same");
      assert.deepEqual(imports1.requires, imports2.requires, "requires should be the same");
  });

  it('should leave lines of code in the order they were originally in - 1', function() {
    var actual = util.separateImports(importAlphabetizer(file).split(NEW_LINE_CHR)).code;
    var code = originalSectionedLines.code;
    var sameLines = actual.filter(function(nextLine, index) {
      return nextLine === code[index];
    });

    assert(code.length === actual.length, "code must have same length as before sorting. actual: " + actual);
    assert(sameLines.length === code.length, "code must have same order after sorting. actual: " + actual);
  });

  it('should leave lines of code in the order they were originally in - 2', function() {
    var actual = util.separateImports(importAlphabetizer(file).split(NEW_LINE_CHR)).code;
    var code = originalSectionedLines.code;
    var sameLines = actual.filter(function(nextLine, index) {
      return nextLine === code[index];
    });

    assert(code.length === actual.length, "code must have same length as before sorting. actual: " + actual);
    assert(sameLines.length === code.length, "code must have same order after sorting. actual: " + actual);
  });

  it('should leave lines of code in the order they were originally in - 3', function() {
    var actual = util.separateImports(importAlphabetizer(file).split(NEW_LINE_CHR)).code;
    var code = originalSectionedLines.code;
    var sameLines = actual.filter(function(nextLine, index) {
      return nextLine === code[index];
    });

    assert(code.length === actual.length, "code must have same length as before sorting. actual: " + actual);
    assert(sameLines.length === code.length, "code must have same order after sorting. actual: " + actual);
  });


});
