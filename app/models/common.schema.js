const {Schema} = require("mongoose");

const LocationSchema = new Schema(
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
);

module.exports = {
    LocationSchema
};

// Resources:
// https://stackoverflow.com/questions/15274834/how-to-store-geospatial-information-in-mongodb
