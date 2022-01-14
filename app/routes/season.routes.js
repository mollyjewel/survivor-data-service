module.exports = app => {
  const seasons = require("../controllers/season.controller.js");

  var router = require("express").Router();

  // Create a new Season
  router.post("/", seasons.create);

  // Retrieve all Seasons
  router.get("/", seasons.findAll);

  // Retrieve all Seasons with a title
  //router.get("/:title", seasons.findAllWithTitle);

  // Retrieve a single Season with number
  router.get("/:number", seasons.findOne);

  // Update a Season with number
  router.put("/:number", seasons.update);

  app.use('/api/seasons', router);
};
