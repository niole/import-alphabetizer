var assert = require('assert');
var util = require('../importUtil');
var testUtil = require('./testUtil');


describe("importUtil", function() {

  var code = [
    "                         ",
    "function lmnop(a, b, c) { ",
    "                         ",
    "console.log('herro'); ",
    "                         ",
    "}                    ",
    "var y = 1+2;",
    "                         ",
  ];

  var requires = [];
  var imports = [];

  beforeEach(function() {
    requires = [
      "var z = require('./../ssdf/ff/mmm');",
      "var j = require('asdfKat');",
      "var losdf = require('aaaaa');",
      "var i = require('./idfm');",
      "var p = require('nioleimport');",
    ];

    imports = [
      "import z from './../ssdf/ff/mmm';",
      "import j from 'asdfKat';",
      "import losdf from 'aaaaa';",
      "import i from './idfm';",
      "import pop from 'nioleimport';",
    ];
  });

  describe("#separateImports", function() {

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
    it('should sort requires by their paths', function() {
      var actual = util.sortDependencies(requires);

      var expected = [
        "var losdf = require('aaaaa');",
        "var j = require('asdfKat');",
        "var i = require('./idfm');",
        "var p = require('nioleimport');",
        "var z = require('./../ssdf/ff/mmm');",
      ];

      assert.deepEqual(actual, expected, "should sort requires by their paths");
    });

    it('should sort imports by their paths', function() {
      var actual = util.sortDependencies(imports);

      var expected = [
        "import losdf from 'aaaaa';",
        "import j from 'asdfKat';",
        "import i from './idfm';",
        "import pop from 'nioleimport';",
        "import z from './../ssdf/ff/mmm';",
      ];

      assert.deepEqual(actual, expected, "should sort imports by their paths");
    });
  });


});
