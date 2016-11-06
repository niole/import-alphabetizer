//requires and imports will by default be alphabetized

var code = [
  "                         ",
  "function lmnop(a, b, c) { ",
  "                         ",
  "	console.log('herro'); ",
  "                         ",
  "}                    ",
  "var y = 1+2;",
  "                         ",
];

var requires = [
  "var k = require('_i-dfm');",
  'var losdf = require("aaaaa");',
  "var j = require('asdfKat');",
  "var p = require('nioleimport');",
  "var i = require('./idfm');",
  "var kl = require('_i-dfm/jj0000');",
  "var z = require('./../ssdf/ff/mmm');",
];

var imports = [
  "import k from '_i-dfm';",
  'import losdf from "aaaaa";',
  "import j from 'asdfKat';",
  "import pop from 'nioleimport';",
  "import i from './idfm';",
  "import kl from '_i-dfm/jj0000';",
  "import z from './../ssdf/ff/mmm';",
];

var fixtures = {
  imports: imports,
  requires: requires,
  code: code,
};

module.exports = fixtures;
