module.exports = app => {
  const castingSheets = require("../controllers/castingSheet.controller.js");

  var router = require("express").Router();

  // Create a new CastingSheet
  router.post("/", castingSheets.create);

  // Retrieve all CastingSheets
  router.get("/", castingSheets.findAll);

  // Retrieve all CastingSheets with a title
  //router.get("/:title", castingSheets.findAllWithTitle);

  // Retrieve a single CastingSheet with id
  router.get("/:id", castingSheets.findOne);

  // Update a CastingSheet with id
  router.put("/:id", castingSheets.update);

  app.use('/api/castingSheets', router);
};
