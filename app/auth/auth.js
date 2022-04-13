const passport = require("passport");
const GoogleStrategy = require("passport-token-google").Strategy;
require('dotenv').config()

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
  },
  function(idToken, refreshToken, profile, done) {
    console.log("idToken: " + idToken);
    console.log("refreshToken: " + refreshToken);
    console.log("profile: " + profile);
    // You can check if google considers idToken as valid at:
    // https://oauth2.googleapis.com/tokeninfo?id_token=
    const user = {
        googleId: profile.id,
        role: (profile.id == process.env.ADMIN_GOOGLE_ID) ? 'admin' : 'viewer',
        displayName: profile.displayName
    }
    return done(null, user);
  }
))

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromHeader('user-token')
    },
    async (token, done) => {
      console.log("token: " + token)
      console.log("token user: " + token.user)
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
)
