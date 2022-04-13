const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const {dbconnect, dbclose} = require("./app/helpers/dbConnect.js");
const AuthController = require("./app/auth/AuthController");
require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

dbconnect();

require('./app/auth/auth')

app.get("/", function(req, res){
  res.render("home");
});

/*
  The route for a user sign in with Google. For a successful login,
  the client must provide the user's googleId and google authorization token,
  which then must be successfully authenticated with Google Identity Services.
  If authentication is successful, a JWT token will be generated and sent back
  to the client to be used for any future put or post requests.
*/

app.post(
  "/api/oauth/google",
  passport.authenticate("google-token", { session: false }),
  AuthController.googleLogin
);

app.post(
  "/verifyUser",
  passport.authenticate("jwt", { session: false }),
  AuthController.jwtAdminLogin
)

// Should be defined before all other put routes
app.put(
  '*',
  passport.authenticate("jwt", { session: false }),
  AuthController.jwtAdminLogin
)

// Should be defined before all other post routes other than authorization
app.post(
  '*',
  passport.authenticate("jwt", { session: false }),
  AuthController.jwtAdminLogin
)

require("./app/routes/season.routes")(app);
require("./app/routes/contestant.routes")(app);
//require("./app/routes/castingSheet.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
