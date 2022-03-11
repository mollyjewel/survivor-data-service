const SeasonalCategoryCounter = require("./SeasonalCategoryCounter")
const sexualOrientations = require("survivor-stats-common/models/sexualOrientation")

class SeasonalSexOrientCounter extends SeasonalCategoryCounter {
  constructor(seasonIds) {
      super(seasonIds, sexualOrientations);
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
         const categories = ((contestant.sexualOrientation === undefined) ? [] : [contestant.sexualOrientation])
         super.addCategoriesToSeason(season.seasonId, categories)
       })
     })
     return this
  }
}

module.exports = SeasonalSexOrientCounter;
