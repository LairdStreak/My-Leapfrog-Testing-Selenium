var request = require('request')
var settings = require('./settings.json')
const testPath = settings.testURL
const token = settings.token
main()

function main (){
  //testCreateSoftLicence(testPath)
  testObsoleteSoftLicence(testPath, 59355)
  
}

function testCreateSoftLicence (path){
    var options = {
        url: path + '/api/SoftLicence/Create/',
        json : true,
        headers : {
         '_token':token
        },
        json: { "IxUser": null, "Comment": null, "IxContact": "92c3b6e5-a3fd-e511-810a-3863bb2e6b08",  "Email": "laird.streak@leapfrog3d.com",
                "Type": null,  "Starts": "0001-01-01T00:00:00+00:00",  "Expires": "0001-01-01T00:00:00+00:00",  "ProductModels": ["geo","interpolation"],
                 "IsTrial": false
        },
        method : 'POST'
    }

    request(options,callbackCreate)
}


function callbackCreate(error, response, body) {
    if (!error && response.statusCode == 201) {
        var info = JSON.parse(body);
        console.log('License created ' + info.IxLicense)
        testObsoleteSoftLicence (testPath, info.IxLicense)
        console.log(info);
        console.log(info);
    } else {
        console.log(response.statusCode);
        console.log(response.body);
    }
}


function testObsoleteSoftLicence (path, ixLicence) {
    var options = {
        url: path + '/api/SoftLicence/ObsoleteSoftLicencesByLicenceId/' + ixLicence,
        headers : {
         '_token':token
        },
        method : 'PATCH'
    }

    request(options, callbackObsoleteSoftLicence)
}


function callbackObsoleteSoftLicence(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('license obsoleted')
    } else {
        console.log(response.statusCode);
        console.log(response.body);
    }
}

