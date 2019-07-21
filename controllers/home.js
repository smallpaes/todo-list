// Include user and todo models
const db = require('../models')
const User = db.User
const Todo = db.Todo
// Include date converter
const { convertDate } = require('../date-converter')

module.exports = {
  getHome: (req, res) => {
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
        res.render('index', { todos, indexCSS: true, dateOptions, noTask: todos.length === 0, hasAnimation: true })
      })
      .catch(error => res.status(422).json(error))
  }
}