const passport = require("passport");

const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../model/user.model");
require("dotenv").config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.jwt_secret_key,
    },
    async (payLoad, done) => {
      const user = await User.findOne({
        where: { id: payLoad.id, isActive: true },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, payLoad);
    },
  ),
);

module.exports = passport;
