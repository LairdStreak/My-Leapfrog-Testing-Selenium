var fs = require('fs')

exports.clearDirectory = function (path) {
  console.log('here' + path)
  clearScreenshotDirectory(path)
  return null
}

function clearScreenshotDirectory (pathClean) {
  var listfiletoDelete = ['login.png', 'daily2.png', 'daily-geo.png', 'daily-geothermal.png', 'daily-hydro.png', 'resources.png', 'resources_training.png']

  listfiletoDelete.forEach(function (fileName) {
    var path = pathClean + fileName
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err)
      }
      console.log('successfully deleted ' + path)
    })
  })
}
