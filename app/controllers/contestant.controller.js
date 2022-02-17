const db = require("../models");
const Contestant = db.contestants;

// Create and Save a new Contestant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send({ message: "Contestant must have a first and last name." });
    return;
  }

  // Create a Contestant
  const contestant = new Contestant(req.body);

  // Save Contestant in the database
  contestant
    .save(contestant)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      if (err instanceof db.mongoose.Error.ValidationError){
        res.status(400).send({
          message:
            err.message || `Validation error occurred while creating contestant ${req.body.firstName} ${req.body.lastName}.`
        });
      }
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating contestant ${req.body.firstName} ${req.body.lastName}.`
      });
    });
}

// Retrieve all Contestants from the database.
exports.findAll = (req, res) => {
  Contestant.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contestants."
      });
    });
}

// Find a single Contestant with the id
exports.findOne = (req, res) => {
  const id = req.params.id

  Contestant.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Contestant ${id} not found.` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Contestant ${id}.` });
    });
}

// Update a Contestant by the contestant id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const filter = { _id: id };

  Contestant.findOneAndUpdate(filter, req.body, { runValidators: true, useFindAndModify: false, new:true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contestant ${id}. Maybe Contestant was not found!`
        });
      } else res.status(201).send(data);
    })
    .catch(err => {
      console.log(`Error updating Contestant ${id}.`);
      console.log(err);
      res.status(500).send({
        message: `Error updating Contestant ${id}.`
      });
    });
}

exports.findAllWithSeason = (req, res) => {
  const seasonId = req.params.id;
  Contestant.find({ 'seasons.seasonId': seasonId })
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Season ${seasonId} not found.` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Contestants with seasonId ${seasonId}.` });
    });
}

exports.addCastingSheet = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Contestant.update(
   { _id: id },
   { $push: { castingSheet: req.body.castingSheet} }
  )
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Contestant ${id}. Maybe Contestant was not found!`
      });
    } else res.send({ message: `Contestant ${id} was updated successfully.` });
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Contestant ${id}.`
    });
  });
}
