const {LocationSchema} = require("./common.schema.js");
const {Schema} = require("mongoose");

module.exports = Schema (
  {
    _id: Number,
    title: String,
    subtitle: String,
    location: LocationSchema,
    contestants: {
      type: [{type: Schema.Types.ObjectId, ref: 'contestants'}],
      default: undefined
    }
  },
  { timestamps: true }
);
