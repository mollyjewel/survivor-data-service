require('dotenv').config();
const request = require("request")
const fs = require('fs')
const db = require("../app/models")
const location = require("survivor-stats-common/helpers/location")
const {dbconnect, dbclose} = require("../app/helpers/dbConnect.js")
const GoogleMapsService = require("../app/services/GoogleMapsService")

dbconnect()

const Contestant = db.contestants

const contestantId = null
const seasonId = 40
const skipExistCoord = true
//const updateHometown = true;
//const updateResidence = true;
saveLocationCoord()

async function saveLocationCoord() {
  const contestants = await getRequestedContestants()

  const hometownContestants = contestants.filter(c => shouldUpdateHometownCoord(c))
  //console.log(hometownContestants)
  let successMsgs = []
  let errorMsgs = []

  hometownContestants.map(contestant => {
      const hometownTxt = location.getText(contestant.hometown)
      GoogleMapsService.getCoord(hometownTxt)
        .then(function(coord) {
          contestant.hometown.coordinates = coord
          contestant.save()
          successMsgs.push(`Succeeded to update coordinates for contestant ${contestant._id} with location ${hometownTxt}.`)
        }).catch(function(error) {
          errorMsgs.push(`Failed to update coordinates for contestant ${contestant._id} with location ${hometownTxt}. Received error ${error}`)
        })
  })

  // need to modify to work for async getCoord. Right now, the length will still be zero
  const summary = `${successMsgs.length} out of ${hometownContestants.length} coordinate updates succeeded.`
  console.log(summary)
}

function getRequestedContestants() {
  if (contestantId) { return Contestant.find({ '_id': contestantId }) }
  if (seasonId) { return Contestant.find({ 'seasons.seasonId': seasonId }) }
  return Contestant.find()
}

function shouldUpdateHometownCoord(contestant) {
  if (!location.getText(contestant.hometown)) {
    return false
  } if (skipExistCoord && contestant.hometown.coordinates.lat && contestant.hometown.coordinates.lng) {
    return false
  }
  return true
}
