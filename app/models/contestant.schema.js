const {LocationSchema} = require("./location.schema.js");
const {Schema} = require("mongoose");

const RACE_ETHNICITY_ENUM = require("survivor-stats-common/models/raceAndEthnicity");
const EDUCATION_FIELD_ENUM = ['Mathematics', 'Public Relations', 'Print Journalism', 'Business Administration'];
const EDUCATION_DEGREE_ENUM = ['High School Diploma', 'Bachelor', 'Bachelor of Science'];
const RELATIONSHIP_STATUS_ENUM = require("survivor-stats-common/models/relationshipStatus");
const GENDER_ENUM = require("survivor-stats-common/models/gender");
const SEXUAL_ORIENTATION_ENUM = ['heterosexual', 'gay', 'bisexual', 'asexual', 'pansexual', 'fluid'];

const DegreeSchema = new Schema(
  {
    title: {
      type: String,
      enum: EDUCATION_DEGREE_ENUM
    },
    majors: {
      type: [String],
      enum: EDUCATION_FIELD_ENUM,
      default: undefined
    },
    minors: {
      type: [String],
      enum: EDUCATION_FIELD_ENUM,
      default: undefined
    }
  },
  { _id : false }
);

const EducationSchema = new Schema(
  {
    schoolName: String,
    degrees: {
      type: [DegreeSchema],
      default: undefined
    }
  },
  { _id : false }
);

const OccupationSchema = new Schema(
  {
    title: String
  },
  { _id : false }
);

const SeasonSchema = new Schema(
  {
    seasonId: {
      type: Number
    },
    residence: LocationSchema,
    relationshipStatus: {
      type: String,
      enum: RELATIONSHIP_STATUS_ENUM,
      default: undefined
    },
    children: Number,
    education: {
      type: [EducationSchema],
      default: undefined
    },
    occupations: {
        type: [OccupationSchema],
        default: undefined
    },
    selfDescriptions: {
      type: [String],
      default: undefined
    },
    hobbies: {
      type: [String],
      default: undefined
    }
  },
  { _id : false }
);

var ContestantSchema = new Schema (
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      nickname: String,
      birthdate: Date,
      gender: {
        type: [String],
        enum: GENDER_ENUM,
        default: undefined
      },
      sexualOrientation: {
        type: String,
        enum: SEXUAL_ORIENTATION_ENUM
      },
      raceAndEthnicity: {
        type: [String],
        enum: RACE_ETHNICITY_ENUM,
        default: undefined
      },
      hometown: LocationSchema,
      seasons: {
        type: [SeasonSchema],
        default: undefined
      },
      wikia: {
        type: String,
        default: undefined
      },
    },
    { timestamps: true }
  );

module.exports = ContestantSchema
