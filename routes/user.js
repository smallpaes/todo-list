const express = require('express')
const router = express.Router()
const passport = require('passport')

// Include user model
const db = require('../models')
const User = db.User

// 認證系統的路由
// 登入頁面
router.get('/login', (req, res) => {
  res.render('login', { userCSS: true })
})
// 登入檢查
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register', { userCSS: true })
})
// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        res.render('register', { name, email, password, password2 })
      } else {
        // create new user
        const newUser = new User({
          name,
          email,
          password
        })
        newUser
          .save()
          .then(user => {
            res.redirect('/')
          })
          .catch(err => console.log(err))
      }
    })

})
// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router