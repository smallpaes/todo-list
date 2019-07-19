const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
// Include user model
const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered' })
        }
        // use bcrypt to check password correction
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
          console.log('user password not correct')
          return done(null, false, { message: 'Email or password incorrect' })
        }
        // if password matched
        return done(null, user)
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
  })
}