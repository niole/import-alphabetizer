var util = require('../importUtil');

function linesAreSorted(lines) {
  var separated = util.separateImports(lines);
  var imports = separated.imports;
  var requires = separated.requires;

  var sameImports = imports.filter(function(imp, index) {
    return imp === lines[index];
  });

  if (sameImports.length === imports.length) {
    var sameRequires = requires.filter(function(req, index) {
      return req === lines[imports.length + index];
    });
    if (sameRequires.length === requires.length) {
      if (imports.length > 1) {
        for (var i=1; i<imports.length; i++) {
          var prev = util.getPathContent(imports[i-1]);
          var curr = util.getPathContent(imports[i]);
          if (curr < prev) {
            return false
          }
        }
      }

      if (requires.length > 1) {
        for (var r=1; r<requires.length; r++) {
          var prev = util.getPathContent(requires[r-1]);
          var curr = util.getPathContent(requires[r]);
          if (curr < prev) {
            return false
          }
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }

  return true;
}

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
  linesAreSorted: linesAreSorted,
};

module.exports = testUtil;
