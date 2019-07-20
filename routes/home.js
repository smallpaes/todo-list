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
  Todo.findAll({
    where: { UserId: req.user.id },
    order: [['dueDate', 'DESC']]
  })
    .then(todos => {
      // Filter option for all unique date
      const dateOptions = []
      todos.forEach(todo => {
        // convert date
        const convertedDate = convertDate(todo.dataValues.dueDate)
        // Add unique date to date filter
        if (!dateOptions.includes(convertedDate)) { dateOptions.push(convertedDate) }
        // convert all displayed date
        todo.dataValues.dueDate = convertedDate
      })
      res.render('index', { todos, indexCSS: true, dateOptions })
    })
    .catch(error => res.status(422).json(error))

})

module.exports = router