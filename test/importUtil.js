var assert = require('assert');
var util = require('../importUtil');
var testUtil = require('./testUtil');
var fixtures = require('./fixtures');
var constants = require('../importConstants');

var GET_REL_PATH_START_PATTERN = constants.GET_REL_PATH_START_PATTERN;
var isRelPathPattern = new RegExp(GET_REL_PATH_START_PATTERN, 'i');

describe("importUtil", function() {
  var code = fixtures.code;
  var requires = [];
  var imports = [];

  describe("#separateImports", function() {

    beforeEach(function() {
      requires = testUtil.shuffleArray(fixtures.requires, [], 0);
      imports = testUtil.shuffleArray(fixtures.imports, [], 0);
    });

    it('should have imports section with only imports', function() {
      var file = testUtil.shuffleArray(code.concat(imports, requires), [], 0);
      var actual = util.separateImports(file);

      assert(testUtil.containsOnlyImports(actual.imports, imports.length), "imports should not contain anything besides");
      assert(!testUtil.containsRequires(actual.imports), "imports should not be requires");
    });

    it('should separate out code, imports, and requires', function() {
      var file = testUtil.shuffleArray(code.concat(imports, requires), [], 0);
      var actual = util.separateImports(file);

      assert(!!actual.imports, "should contain imports section");
      assert(!!actual.requires, "should contain imports requires");
      assert(!!actual.code, "should contain imports code");
    });

    it('should have requires section with only requires', function() {
      var file = testUtil.shuffleArray(code.concat(imports, requires), [], 0);
      var output = util.separateImports(file);

      assert(testUtil.containsOnlyRequires(output.requires, requires.length), "requires should not contain anything besides");
      assert(!testUtil.containsImports(output.requires), "requires should not be imports");
    });

    it('should have code section with only code', function() {
      var file = testUtil.shuffleArray(code.concat(imports, requires), [], 0);
      var output = util.separateImports(file);

      assert(!testUtil.containsImports(output.code), "code should not be imports");
      assert(!testUtil.containsRequires(output.code), "code should not be requires");
    });
  });

  describe("#sortDependencies", function() {
    beforeEach(function() {
      requires = testUtil.shuffleArray(fixtures.requires, [], 0);
      imports = testUtil.shuffleArray(fixtures.imports, [], 0);
    });

    it('should sort requires by their paths', function() {
      var actual = util.sortDependencies(requires);
      var expected = fixtures.requires;

      assert.deepEqual(actual, expected, "should sort requires by their paths");
    });

    it('should sort imports by their paths', function() {
      var actual = util.sortDependencies(imports);
      var expected = fixtures.imports;

      assert.deepEqual(actual, expected, "should sort imports by their paths");
    });

    it('should sort absolute imports before relative', function() {
      var actual = util.sortDependencies(imports);
      var sawRel = false;
      var absBeforeRel = true;

      for (var i=0; i<actual.length; i++) {
        var a = actual[i];
        if (isRelPathPattern.test(a)) {
          sawRel = true;
        } else if (sawRel) {
          //saw a rel, but now we're back to absolute. so FAIL
          absBeforeRel = false;
          break;
        }
      }

      assert(absBeforeRel, "absolute imports should come before relative");
    });

    it('should sort absolute imports before relative - 2', function() {
      var actual = util.sortDependencies(imports);
      var sawRel = false;
      var absBeforeRel = true;

      for (var i=0; i<actual.length; i++) {
        var a = actual[i];
        if (isRelPathPattern.test(a)) {
          sawRel = true;
        } else if (sawRel) {
          //saw a rel, but now we're back to absolute. so FAIL
          absBeforeRel = false;
          break;
        }
      }

      assert(absBeforeRel, "absolute imports should come before relative");
    });

    it('should sort absolute imports before relative - 3', function() {
      var actual = util.sortDependencies(imports);
      var sawRel = false;
      var absBeforeRel = true;

      for (var i=0; i<actual.length; i++) {
        var a = actual[i];
        if (isRelPathPattern.test(a)) {
          sawRel = true;
        } else if (sawRel) {
          //saw a rel, but now we're back to absolute. so FAIL
          absBeforeRel = false;
          break;
        }
      }

      assert(absBeforeRel, "absolute imports should come before relative");
    });
  });
});
