// [
//    {"content":"plainbolditalic","modifiers":[{"data":{"authorID":"5","undoCount":0},"end":5,"start":0,"type":"ai"},
//    {"end":10,"start":5,"type":"b"},{"data":{"authorID":"5","revert":"pmod","revertData":{},"undoCount":0},"end":15,"start":5,"type":"uc"},{"end":15,"start":9,"type":"i"}],"tabLevel":0,"type":"paragraph"}]
function walk(o, depth, preIndent, noMeasure) {
  if (typeof(o) !== 'object' || o === null || o === undefined) {
    if (typeof(o) === 'string') {
      var s = ''+o;
      return '\''+s.replace(/'/g,'\\\'')+'\'';
    }
    return ''+o;
  }

  var doSingleLine = true;

  if (!noMeasure) {
    a = walk(o, depth, preIndent, /*noMeasure*/true);
    if (a.length < 100) {
      return a;
    } else {
      a = '';
      doSingleLine = false;
    }
  }

  var a = '';
  var pre, post;
  if (doSingleLine) {
    pre = '';
    post = '';
  } else {
    pre = '\n'+preIndent+'  ';
    post = ',\n'+preIndent;
  }

  // rules:
  // - string starts at proper indentation for first item
  // - newlines get 'preIndent' spacing put before them
  if (Array.isArray(o)) {
    a = '['
    for (var i = 0; i < o.length; ++i) {
      a += (i > 0 ? ', ': '')+ pre + walk(o[i], depth+1, preIndent+'  ', noMeasure);
    }
    a += post+']';
  } else {
    a = '{';
    var first = '';
    for (var k in o) {
      a += first+pre + k + ': '+walk(o[k], depth+1, preIndent+'  ', noMeasure);
      first = ', ';
    }
    a += post+'}';
  }
  return a;
}



var main = function(){
  process.stdin.setEncoding('utf8');

  var stdin = ''
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      stdin += chunk;
    }
  });

  process.stdin.on('end', () => {
    process.stdout.write(walk(JSON.parse(stdin), 0, '')+'\n');
  });
}

if (require.main === module) {
    main();
}