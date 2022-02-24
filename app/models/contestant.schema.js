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

const CastingSheetSchema = new Schema(
  {
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

const SeasonSchema = new Schema(
  {
    seasonId: {
      type: Number,

    },
    castingSheet: {
      type: CastingSheetSchema,
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

/*


field: {
  enum: [
    'Sports & Fitness',
    'Arts & Entertainment',
    'Science & Technology',
    'Architecture & Engineering',
    'Public Service',
    'Service'
    'Agriculture',
    'Education',
    'Health & Medicine',
    'Law & Politics',
    'Business & Management',
    'Communications']
}

A Asexual
Bi Bisexual
Hetero Heterosexual
Homo Homosexual

The standards have five categories for data on race: Hispanic or Latino, American Indian or Alaska Native, Asian, Black or African American, Native Hawaiian or Other Pacific Islander, and White.

{
   $jsonSchema: {
      required: ['firstname', 'lastname'], // the customer field is required
      properties: {
        firstname: {bsonType: "string"},
        lastname: {bsonType: "string"},
        nickname: {bsonType: "string"},
        gender: {
           enum: ['male', 'female', 'trans']
        }
        birthdate: {bsonType: "date"},
        occupation: {
          title: {bsonType: "string"},
        }
      }
   }
}


{
firstname: "",
lastname: "",
nickname: "",
gender: "",
birthdate: {day: , month: , year: },
hometown:
residence: //residence when casted
occupation: [],
race:[],
sexualOrientation: "",
seasons: []  // competitor ids should be in season instead
}

{
  firstName: "Natalie",
  lastName: "Anderson",
  gender: "female",
  birthdate: {day: 11, month: 4, year: 1986},
  hometown: {city: "Colombo", country: "Sri Lanka"}
  residence: {city: "Edgewater", state: "New Jersey"},
  occupations: [
  {
  title: "CrossFit Trainer"
  },
  {
  title: "Physical Therapy Student"
  }],
  race:["asian"]
}

{
firstname: "Benjamin",
lastname: "Wade",
gender: "Male",
nickname: "Coach",
birthday: {day: 18, month: 9, year: 1971},
hometown: {city: "Bolivar", state: "Missouri", country: "USA"}
occupation: {
  title: "Soccer Coach",
  field: "Sports & Fitness",
},
race:["white"]
seasons: [18, 20, 23]
}


*/
