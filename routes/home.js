const express = require('express')
const router = express.Router()
// Include user and todo models
const db = require('../models')
const User = db.User
const Todo = db.Todo
// Include isAuthenticated modules
const { isAuthenticated } = require('../config/auth')
// Include date converter
const { convertDate } = require('../date-converter')

router.get('/', isAuthenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findAll({ where: { UserId: req.user.id } })
    })
    .then(todos => {
      todos.forEach(todo => todo.dataValues.dueDate = convertDate(todo.dataValues.dueDate))
      return res.render('index', { todos, indexCSS: true })
    })
    .catch(error => res.status(422).json(error))

})

module.exports = router