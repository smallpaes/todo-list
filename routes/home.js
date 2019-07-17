const express = require('express')
const router = express.Router()
// Include user and todo models
const db = require('../models')
const User = db.User
const Todo = db.Todo
// Include isAuthenticated modules
const { isAuthenticated } = require('../config/auth')

router.get('/', isAuthenticated, (req, res) => {
  res.send('list all todos')
})

module.exports = router