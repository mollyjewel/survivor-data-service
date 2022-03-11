const SeasonalCategoryCounter = require("./SeasonalCategoryCounter")
const raceAndEthnicityCategories = require("survivor-stats-common/models/raceAndEthnicity")

class SeasonalRaceCounter extends SeasonalCategoryCounter {
  constructor(seasonIds) {
      super(seasonIds, raceAndEthnicityCategories);
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
         super.addCategoriesToSeason(season.seasonId, contestant.raceAndEthnicity)
       })
     })
     return this
  }
}

module.exports = SeasonalRaceCounter;
