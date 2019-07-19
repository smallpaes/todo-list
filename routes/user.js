const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')

// Include user model
const db = require('../models')
const User = db.User

// 認證系統的路由
// 登入頁面
router.get('/login', (req, res) => {
  res.render('login', { userCSS: true, formValidation: true })
})

// 登入檢查
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register', { userCSS: true, formValidation: true })
})

// 註冊檢查
router.post('/register', [
  body('name')
    .isLength({ min: 1, max: 10 })
    .withMessage('Name is required, max 10 letters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .custom(value => {
      const regex = /^\S{8,12}$/
      const result = value.match(regex)
      if (!result) {
        throw new Error('Password length must be between 8-12')
      }
      return true
    }),
  body('password2')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password does not matched')
      }
      return true
    })
], (req, res) => {
  const { name, email, password, password2 } = req.body
  // retrieve error message from req
  const errors = validationResult(req)
  // validation failed
  if (!errors.isEmpty()) {
    return res.status(422).render('register', {
      userCSS: true,
      formValidation: true,
      warning: errors.array(),
      todoData: { name, email, password, password2 }
    })
  }
  // validation passed
  User.findOne({ where: { email: email } })
    .then(async (user) => {
      if (user) {
        console.log('User already exists')
        res.render('register', { todoData: { name, email, password, password2 } })
      } else {
        try {
          //create hashed password
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(password, salt)

          // create new user
          const newUser = new User({
            name,
            email,
            password: hash
          })
          newUser
            .save()
            .then(user => res.redirect('/'))
            .catch(err => console.log(err))
        } catch (error) {
          console.log(error)
        }
      }
    })

})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'Log out successfully, see you next time :)')
  res.redirect('/users/login')
})

module.exports = router