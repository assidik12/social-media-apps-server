const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../models/user");
//var User= require('mongoose').model('User');

module.exports = function (passport) {
  // Local Strategy
  passport.use(
    "local",
    new LocalStrategy(function (username, password, done) {
      //console.log('*** in passport.use')
      // Match Username
      //console.log(username);
      //console.log(password);
      let query = { username: username };
      User.findOne(query, function (err, user) {
        //console.log(user)
        if (err) {
          //console.log('*** err', err)
          return done(err);
        }
        if (!user) {
          //console.log('*** no username')
          return done(null, false, { message: "No user found" });
        }
        //console.log(password)
        //console.log(user.password)
        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            //console.log('Password match')
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        });
      });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
var TwitterStrategy = require("passport-twitter").Strategy;

passport.use(
  new TwitterStrategy(
    {
      consumerKey: "XXXXXXXXXX",
      consumerSecret: "XXXXXXXXX",
      callbackURL: "http://localhost:5000/user/home",
      profileFields: ["emails", "displayName"],
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreate({ twitterEmail: profile.email }, function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: "XXXXXXXXXXXXXXXX",
      clientSecret: "XXXXXXXXXXXXXXXXXXXXXXX",
      callbackURL: "http://localhost:5000/user/home",
      profileFields: ["emails", "displayName"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ facebookEmail: profile.email }, function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

var GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

passport.use(
  new GoogleStrategy(
    {
      consumerKey: "XXXXXXXXXXXXXXXXXX",
      consumerSecret: "XXXXXXXXXXXXXXXXXXXXX",
      callbackURL: "http://localhost:5000/user/home",
      profileFields: ["emails", "displayName"],
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreate({ googleEmail: profile.email }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
