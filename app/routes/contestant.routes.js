module.exports = app => {
  const contestants = require("../controllers/contestant.controller.js");

  var router = require("express").Router();

  // Create a new Contestant
  router.post("/", contestants.create);

  // Retrieve all Contestants
  router.get("/", contestants.findAll);

  // Retrieve a single Contestant with id
  router.get("/:id", contestants.findOne);

  // Retrieve a all Contestants with seasonId
  router.get("/season/:id", contestants.findAllWithSeason);

  // Retrieve all Contestant genders by season
  router.get("/gender/percents/", contestants.findGenderPercents);

  // Retrieve all Contestant race and ethnicities by season
  router.get("/race/percents/", contestants.findRacePercents);

  // Retrieve all Contestant sexual orientations by season
  router.get("/sexualOrientation/percents/", contestants.findSexOrientPercents);

  // Update a Contestant with id
  router.put("/:id", contestants.update);

  // Add a Casting Sheet for the Contestant
  //router.put("/:id/castingSheet", contestants.addCastingSheet);

  app.use('/api/contestants', router);
};
