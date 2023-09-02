const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const { User } = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function verify(username, password, done) {
        const user = await User.findOne({ where: { email: username } });
        if (user === null) {
          return done(null, false, {
            status: "fail",
            objects: null,
            err: "User not found",
          });
        }
        console.log(user.passHash);
        bcrypt.compare(password, user.passHash, (err, res) => {
          if (err) {
            return done(err, {
              status: "fail",
              objects: null,
              err: "Incorrect username or password",
            });
          }
          if (res === false) {
            return done(null, false, {
              status: "fail",
              objects: null,
              err: "Incorrect username or password",
            });
          } else {
            return done(null, user);
          }
        });
      }
    )
  );
  passport.serializeUser(function (user, cb) {
    cb(null, {
      id: user.id,
      username: user.fullname,
      role: user.role,
      email: user.email,
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
