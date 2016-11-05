var assert = require('assert');
var util = require('../importUtil');
var testUtil = require('./testUtil');

var a = [1,2,3,4,5,6];
console.log('shuffled', testUtil.shuffle(a, [], 0));

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

  describe("#separateImports", function() {
    it('should separate out code, imports, and requires', function() {
      var file = 
      var actual = util.separateImports(requires);

      var expected = [
        "var losdf = require('aaaaa');",
        "var j = require('asdfKat');",
        "var i = require('./idfm');",
        "var p = require('nioleimport');",
        "var z = require('./../ssdf/ff/mmm');",
      ];

      assert.deepEqual(actual, expected, "should sort requires by their paths");
    });
  });
});