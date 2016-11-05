var util = require('../importUtil');

function shuffleArray(a, tmp, index) {
  var newIndex = Math.floor(Math.random()*a.length);
  if (index === a.length) {
    return tmp.filter(function(x) {
      return !!x;
    });
  }

  if (!tmp[newIndex]) {
    tmp[newIndex] = a[index];
  } else {
    //find place to put next one
    while (tmp[newIndex]) {
        newIndex += 1;
        newIndex % a.length;
    }
    tmp[newIndex] = a[index];
  }

  return shuffleArray(a, tmp, index+1);
}

function containsOnlyImports(actualImports, expectedTotalImports) {
  var totalImports = actualImports.filter(function(i) {
   return util.isImport(i);
  }).length;
  return expectedTotalImports === totalImports;
}

function containsRequires(imports) {
  return !!imports.filter(function(i) {
   return util.isRequire(i);
  }).length;
}

function containsImports(imports) {
  return !!imports.filter(function(i) {
   return util.isImport(i);
  }).length;
}

function containsOnlyRequires(actualRequires, expectedTotalRequires) {
  var totalRequires = actualRequires.filter(function(i) {
   return util.isRequire(i);
  }).length;

  return expectedTotalRequires === totalRequires;
}

var testUtil = {
  containsOnlyImports: containsOnlyImports,
  shuffleArray: shuffleArray,
  containsOnlyRequires: containsOnlyRequires,
  containsRequires: containsRequires,
  containsImports: containsImports,
};

module.exports = testUtil;
