var fs = require('fs')
var fileList = require('./imageList.json')

exports.clearDirectory = function (path) {
  clearScreenshotDirectory(path)
  return null
}

function clearScreenshotDirectory (pathClean) {
  fileList.files.forEach(function (fileName) {
    var path = pathClean + fileName
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err)
      }
      console.log('successfully deleted ' + path)
    })
  })
}
