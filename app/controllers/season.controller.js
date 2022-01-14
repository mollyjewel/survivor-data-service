const db = require("../models");
const Season = db.seasons;

// Create and Save a new Season
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({ message: "Season must have a number." });
    return;
  }

  // Create a Season
  const season = new Season({
    _id: req.body.number,
    title: req.body.title,
    subtitle: req.body.subtitle
  });

  // Save Season in the database
  season
    .save(season)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating season number ${req.body.number}.`
      });
    });
};

// Retrieve all Seasons from the database.
exports.findAll = (req, res) => {
  Season.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving seasons."
      });
    });
};

// Find a single Season with the season number
exports.findOne = (req, res) => {
  const id = req.params.number;

  Season.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Season number ${id} not found.` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Season number ${id}.` });
    });
};

// Update a Season by the season number in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.number;

  Season.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Season number ${id}. Maybe Season was not found!`
        });
      } else res.send({ message: `Season number ${id} was updated successfully.` });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Season number ${id}.`
      });
    });
};

// Find all Seasons with the given title
exports.findAllWithTitle = (req, res) => {
  const title = req.params.title;

  Season.find({ title: title })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving seasons with title ${title}.`
      });
    });
};
