const request = require("request")
require('dotenv').config()

class GoogleMapsService {
  static BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

  static getCoord(locationTxt) {
    let url = GoogleMapsService.BASE_URL + locationTxt + "&key=" + process.env.GEOCODE_API_KEY
    return new Promise(function(resolve,reject) {
      request(url, function (error, response, body) {
          if (error) {
            reject(`geocode API failed for address ${locationTxt} with error ${error}.`)
          } else if (response.statusCode != 200) {
            reject(`geocode API failed for address ${locationTxt} with statusCode ${response.statusCode}.`)
          } else if (JSON.parse(body).results.length === 0) {
            reject(`geocode API found 0 results for address ${locationTxt}.`)
          } else {
            const coord = JSON.parse(body).results[0].geometry.location
            //const msg = `geocode API succeeded for address ${locationTxt} with coordinates ${coord.lat} ${coord.lng}.`
            //console.log(msg)
            resolve(coord)
          }
      })
    })
  }
}

module.exports = GoogleMapsService;
