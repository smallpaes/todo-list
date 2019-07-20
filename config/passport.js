const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
// Include user model
const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          return done(null, false, req.flash('warning', 'This email is not registered'))
        }
        // use bcrypt to check password correction
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
          return done(null, false, req.flash('warning', 'Email or password incorrect'))
        }
        // if password matched
        return done(null, user)
      })
  }))

  // use Facebook to login
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['displayName', 'photos', 'email']
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ where: { email: profile._json.email } })
        .then(async (user) => {
          // if user exist
          if (user) { return done(null, user) }
          try {
            // new user, generate a set of random password
            const randomPassword = Math.random().toString(32).slice(-8)
            // bcrypt password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(randomPassword, salt)
            // create new user object and save
            User.create({
              name: profile._json.name,
              email: profile._json.email,
              password: hash
            })
              .then(user => done(null, user))
              .catch(error => done(error))
          } catch (error) {
            done(error)
          }
        })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
  })
}