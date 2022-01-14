const db = require("../models");
const CastingSheet = db.castingSheets;

// Create and Save a new CastingSheet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.contestantId || !req.body.seasonId) {
    res.status(400).send({ message: "CastingSheet must have a contestantId and seasonId." });
    return;
  }

  // Create a CastingSheet
  const castingSheet = new CastingSheet(req.body
    /*{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    gender: req.body.gender

    contestantId: ,
    seasonId: ,
    location: ,
    relationshipStatus: ,
    education: ,
    curOccupations: ,
    prevOccupations: ,
    selfDescriptions: ,
    hobbies:
  }*/
);

  // Save CastingSheet in the database
  castingSheet
    .save(castingSheet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating castingSheet ${req.body.contestantId} ${req.body.seasonId}.`
      });
    });
};

// Retrieve all CastingSheets from the database.
exports.findAll = (req, res) => {
  CastingSheet.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving castingSheets."
      });
    });
};

// Find a single CastingSheet with the id
exports.findOne = (req, res) => {
  const id = req.params.id

  CastingSheet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `CastingSheet ${id} not found.` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving CastingSheet ${id}.` });
    });
};

// Update a CastingSheet by the castingSheet id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  CastingSheet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CastingSheet ${id}. Maybe CastingSheet was not found!`
        });
      } else res.send({ message: `CastingSheet ${id} was updated successfully.` });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating CastingSheet ${id}.`
      });
    });
};
