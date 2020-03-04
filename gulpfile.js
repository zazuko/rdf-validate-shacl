var gulp = require('gulp')
var fs = require('fs')

var http = require('https')

var fetch = function (url, c) {
  var acc = ''
  http.get(url, function (res) {
    res.on('data', function (d) {
      acc += d
    })
    res.on('end', function () {
      c(acc)
    })
  })
}

gulp.task('checkJavaFiles', function (cb) {
  // In the current design, the version of dash.ttl in the Java repo (and TopBraid) is slightly different
  // because the Java version requires some hard-coded features from the tosh namespace, so this is left
  // out of the synch test for now
  var files = [
    ['./shared/rdfquery.js', 'https://raw.githubusercontent.com/TopQuadrant/shacl/master/src/main/resources/js/rdfquery.js']
  ]

  var uptodate = true
  var checkFile = function (fileInfo, cb) {
    var p = fileInfo[0]
    var url = fileInfo[1]
    var read = fs.readFileSync(p).toString()
    fetch(url, function (data) {
      console.log(url)
      console.log(read === data)
      uptodate = uptodate && (read === data)
      cb()
    })
  }

  var checkFiles = function (files) {
    if (files.length === 0) {
      if (uptodate) {
        cb()
      } else {
        cb(new Error('Some Java files are not in sync'))
      }
    } else {
      var file = files.shift()
      checkFile(file, function () {
        checkFiles(files)
      })
    }
  }

  checkFiles(files)
})

/**
 * We generate rdfquery from the shared library and we add it to the validator code and to the
 * list of libraries that must be loaded.
 */
gulp.task('generate-libraries', function () {
  var rdfqueryTemplate = fs.readFileSync('./templates/rdfquery.js').toString()
  var rdfqueryData = fs.readFileSync('./shared/rdfquery.js').toString()
  var generated = rdfqueryTemplate.replace('</content>', rdfqueryData)
  fs.writeFileSync('./src/rdfquery.js', generated)
})
