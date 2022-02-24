const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const {Schema} = require("mongoose")
const locationHelper = require("survivor-stats-common/helpers/location")
const GoogleMapsService = require("../services/GoogleMapsService")

var LocationSchema = new Schema(
  {
    city: String,
    island: String,
    state: String,
    municipality: String,
    province: String,
    country: String,
    coordinates: {
      lat: Number, //latitude
      lng: Number //longitude
    }
  },
  { _id : false }
)

/* Doesn't behave as expected. Desired behaviour is that coordinates are updated
if and only if the location has been modified in order to limit calls to Geocode API.
isModified() returns true for all subdocuments, even if values are unchanged (see
https://github.com/Automattic/mongoose/issues/4224 for more info). */
LocationSchema.pre('save', function (next) {
    console.log('Hit the location pre save')
    console.log(this)
    let location = this
    if (!location.isModified('city island state municipality province country')) {
      console.log('Skip the coord refresh')
      next()
    } else {
      const hometownTxt = locationHelper.getText(location)
      GoogleMapsService.getCoord(hometownTxt)
        .then(function(coord) {
          console.log(coord)
          console.log(location)
          location.coordinates = coord
          //this.set({ coordinates: coord });
          console.log(location)
          next()
        })
        .catch(function(error) {
          console.log(`Failed to update coordinates for location ${hometownTxt}.`)
          console.log(`Received error ${error}`)
          next()
        })
    }
})

module.exports = {
    LocationSchema
};
