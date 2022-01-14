const contestant = {};

contestant.fullInfoInput = {
    firstName: "Natalie",
    lastName: "Anderson",
    gender: "female",
    sexualOrientation: "heterosexual",
    birthdate: "1986-04-11",
    raceAndEthnicity: ["Asian"],
    hometown: {
        city: "Colombo",
        country: "Sri Lanka"
    },
    castingSheets: [
        {
            seasonId: 40,
            residence: {
                city: "Edgewater",
                state: "New Jersey",
                country: "USA"
            },
            relationshipStatus: "single",
            children: 0,
            education: [
              {
                schoolName: "Fordham University",
                degrees: [{
                  title: "Bachelor",
                  majors: ["Business Administration"]
                }]
              }
            ],
            occupation: {
              current: [{title: "CrossFit Trainer"}, {title: "Physical Therapy Student"}],
              previous: [{title: "Waitress"}]
            },
            selfDescriptions: [
                "strong",
                "relentless",
                "adaptable"
            ],
            hobbies: [
                "CrossFit",
                "adventuring",
                "eating tacos"
            ]
        }
    ]
};

contestant.fullInfoOutput = {
    firstName: "Natalie",
    lastName: "Anderson",
    gender: "female",
    sexualOrientation: "heterosexual",
    birthdate: "1986-04-11T00:00:00.000Z",
    raceAndEthnicity: ["Asian"],
    hometown: {
        city: "Colombo",
        country: "Sri Lanka"
    },
    castingSheets: [
        {
            seasonId: 40,
            residence: {
                city: "Edgewater",
                state: "New Jersey",
                country: "USA"
            },
            relationshipStatus: "single",
            children: 0,
            education: [
              {
                schoolName: "Fordham University",
                degrees: [{
                  title: "Bachelor",
                  majors: ["Business Administration"]
                }]
              }
            ],
            occupation: {
              current: [{title: "CrossFit Trainer"}, {title: "Physical Therapy Student"}],
              previous: [{title: "Waitress"}]
            },
            selfDescriptions: [
                "strong",
                "relentless",
                "adaptable"
            ],
            hobbies: [
                "CrossFit",
                "adventuring",
                "eating tacos"
            ]
        }
    ]
};

module.exports = contestant;
