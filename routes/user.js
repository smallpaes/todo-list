const express = require('express')
const router = express.Router()
const passport = require('passport')

// Include Controller
const userController = require('../controllers/user')
// Include server-side validation
const validation = require('../express-validator')

// 認證系統的路由
// 登入頁面
router.get('/login', userController.getLogin)

// 登入檢查
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊頁面
router.get('/register', userController.getRegister)

// 註冊檢查
router.post('/register', validation.registerUser, userController.postRegister)

// 登出
router.get('/logout', userController.getLogout)

module.exports = router