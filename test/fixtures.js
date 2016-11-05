//requires and imports will by default be alphabetized

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

var requires = [
  "var losdf = require('aaaaa');",
  "var j = require('asdfKat');",
  "var i = require('./idfm');",
  "var p = require('nioleimport');",
  "var z = require('./../ssdf/ff/mmm');",
];

var imports = [
  "import losdf from 'aaaaa';",
  "import j from 'asdfKat';",
  "import i from './idfm';",
  "import pop from 'nioleimport';",
  "import z from './../ssdf/ff/mmm';",
];

var fixtures = {
  imports: imports,
  requires: requires,
  code: code,
};

module.exports = fixtures;
