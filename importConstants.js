var constants = {
  NEW_LINE_CHR: "\n",
  REQUIRE_PATTERN: /(= require)/,
  IMPORT_PATTERN: /import (.)* from/,
  GET_PATH_PATTERN: /\/([a-zA-Z0-9]*)/i,
  GET_REL_PATH_START_PATTERN: '[/.]',
  GET_SINGLE_QUOTE_PATH_PATTERN: /'([a-zA-Z0-9]*)'/i,
  GET_DOUBLE_QUOTE_PATH_PATTERN: /"([a-zA-Z0-9]*)"/i,
};

module.exports =constants;
