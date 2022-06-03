const db = require("../models");

function dbconnect() {
    //mongoose.connect(DB_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    //return mongoose.connection

    db.mongoose
      .connect(process.env.PROD_SURVIVOR_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
      });
      return db.mongoose.connection;

  }

  function dbclose() {
    return db.mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};
