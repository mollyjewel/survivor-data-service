const SeasonalCategoryCounter = require("./SeasonalCategoryCounter")
const genderTypes = require("survivor-stats-common/models/gender")

class SeasonalGenderCounter extends SeasonalCategoryCounter {
  constructor(seasonIds) {
      super(seasonIds, genderTypes);
  }
  /*
  input example:
  [{  gender: [ 'female' ],
      seasons: [ { seasonId: 2 }, { seasonId: 8 }, { seasonId: 40 } ] }]
  */
  addContestants(contestants) {
     contestants.map(contestant => {
       contestant.seasons.map(season => {
         super.addContestantToSeason(season.seasonId)
         super.addCategoriesToSeason(season.seasonId, contestant.gender)
       })
     })
     return this
  }
}

module.exports = SeasonalGenderCounter;
