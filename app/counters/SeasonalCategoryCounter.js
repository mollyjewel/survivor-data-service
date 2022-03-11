const UNKNOWN = 'unknown'
const CONTESTANT = 'contestant'

class SeasonalCategoryCounter {
  #seasonalCounts = {}
  /*{
    1: {
        'contestant': 21,
        'male': 10,
        'female': 9,
        'trans': 0,
        'nonbinary': 2,
      }
  }   */

  #getZeroCounts(categories) {
    let zeroCounts = {}
    zeroCounts[CONTESTANT] = 0
    zeroCounts[UNKNOWN] = 0
    categories.map(category => {
      zeroCounts[category] = 0
    })
    return zeroCounts
  }

  constructor(seasonIds, categories) {
    seasonIds.map(seasonId => {
      this.#seasonalCounts[seasonId] = this.#getZeroCounts(categories)
    })
  }

  getSeasonalCounts() {
    return this.#seasonalCounts
  }

  addContestantToSeason(seasonId) {
    if (seasonId in this.#seasonalCounts) {
      this.#seasonalCounts[seasonId][CONTESTANT]++
    } else {
      console.warn(`Failed to find season ${seasonId} in seasonalCounts`)
    }
  }

  #addCategoryToSeason(seasonId, category) {
    if (!(seasonId in this.#seasonalCounts)) {
      console.warn(`Failed to find season ${seasonId} in seasonalCounts`)
      return
    }
    if (!(category in this.#seasonalCounts[seasonId])) {
      console.warn(`Failed to find category ${category} in season ${seasonId} in seasonalCounts`)
      return
    }
    this.#seasonalCounts[seasonId][category]++
  }

  addCategoriesToSeason(seasonId, categories) {
    if (categories === undefined || !categories.length) {
      this.#addCategoryToSeason(seasonId, UNKNOWN)
    } else {
      categories.map(category => {
        this.#addCategoryToSeason(seasonId, category)
      })
    }
  }

  /*
    output example:
    [{'season': 1, 'male': 50, 'female': 35, 'trans': 5, 'nonbinary': 10}]
  */
  getSeasonalPercents() {
    let percents = []
    for (const season in this.#seasonalCounts) {
      let seasonPercents = {}
      seasonPercents.season = season
      for (const category in this.#seasonalCounts[season]) {
        if (category != CONTESTANT) {
          seasonPercents[category] =
            this.#seasonalCounts[season][category]
            / this.#seasonalCounts[season][CONTESTANT]
            * 100
        }
      }
      percents.push(seasonPercents)
    }
    return percents
  }

}

module.exports = SeasonalCategoryCounter;
