const mongoose = require("mongoose");
const SeasonSchema = require("./season.schema.js");
const ContestantSchema = require("./contestant.schema.js");
//const CastingSheetSchema = require("./castingSheet.schema.js");

const db = {};
db.mongoose = mongoose;
db.contestants = mongoose.model("Contestant", ContestantSchema);
db.seasons = mongoose.model("Season", SeasonSchema);
//db.castingSheets = mongoose.model("CastingSheet", CastingSheetSchema);

module.exports = db;
