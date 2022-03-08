//const db = require("../models");
const genderTypes = require("survivor-stats-common/models/gender")
const {getSeasonIds} = require("../data-access/season.data.js")

class GenderCounter {
  #seasonGenderCounts
  /*{
    1: {
        'contestant': 21,
        'male': 10,
        'female': 9,
        'trans': 0,
        'nonbinary': 2,
      },
    2: {
        'contestant': 18,
        'male': 8,
        'female': 10,
        'trans': 0,
        'nonbinary': 0,
      }
  }   */

  #getZeroGenderCounts() {
    let zeroGenderCounts = {}
    zeroGenderCounts['contestant'] = 0
    zeroGenderCounts['unknown'] = 0
    genderTypes.map(gender => {
      zeroGenderCounts[gender] = 0
    })
    return zeroGenderCounts
  }

  constructor(seasonIds) {
    let seasonGenderCounts = {}
    seasonIds.map(seasonId => {
      seasonGenderCounts[seasonId] = this.#getZeroGenderCounts()
    })
    this.#seasonGenderCounts = seasonGenderCounts
  }

  getGenderCounts() {
    return this.#seasonGenderCounts
  }

  #addContestantToSeason(seasonId) {
    if (seasonId in this.#seasonGenderCounts) {
      this.#seasonGenderCounts[seasonId]['contestant']++
    } else {
      console.warn(`Failed to find season ${seasonId} in seasonGenderCounts`)
    }
  }

  #addGenderToSeason(seasonId, gender) {
    if (!(seasonId in this.#seasonGenderCounts)) {
      console.warn(`Failed to find season ${seasonId} in seasonGenderCounts`)
      return
    }
    if (!(gender in this.#seasonGenderCounts[seasonId])) {
      console.warn(`Failed to find gender ${gender} in season ${seasonId} in seasonGenderCounts`)
      return
    }
    this.#seasonGenderCounts[seasonId][gender]++
  }

  #addGendersToSeason(seasonId, genders) {
    if (genders === undefined || genders === []) {
      this.#addGenderToSeason(seasonId, 'unknown')
    } else {
      genders.map(gender => {
        this.#addGenderToSeason(seasonId, gender)
      })
    }
  }

  /*
  input example:
  [{  gender: [ 'female' ],
      seasons: [ { seasonId: 2 }, { seasonId: 8 }, { seasonId: 40 } ] }]
  */
  addContestants(contestants) {
     contestants.map(contestant => {
       contestant.seasons.map(season => {
         this.#addContestantToSeason(season.seasonId)
         this.#addGendersToSeason(season.seasonId, contestant.gender)
       })
     })
     return this
  }

  /*
    output example:
    [{'season': 1, 'male': 50, 'female': 35, 'trans': 5, 'nonbinary': 10}]
  */
  getSeasonGenderPercents() {
    let percents = []
    for (const season in this.#seasonGenderCounts) {
      let seasonGenderPercents = {}
      seasonGenderPercents.season = season
      for (const gender in this.#seasonGenderCounts[season]) {
        if (gender != 'contestant') {
          seasonGenderPercents[gender] =
            this.#seasonGenderCounts[season][gender]
            / this.#seasonGenderCounts[season]['contestant']
            * 100
        }
      }
      percents.push(seasonGenderPercents)
    }
    return percents
  }

}

module.exports = GenderCounter;
