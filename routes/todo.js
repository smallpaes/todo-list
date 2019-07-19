const express = require('express')
const router = express.Router()
// Include todo and user models
const db = require('../models')
const User = db.User
const Todo = db.Todo
// Include isAuthenticated module
const { isAuthenticated } = require('../config/auth')

router.get('/', isAuthenticated, (req, res) => {
  res.send('list all todos')
})

// show one todo
router.get('/view/:id', isAuthenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => res.render('detail', { todo, detailCSS: true }))
    .catch(error => res.status(422).json(error))
})

// create todo page
router.get('/new', isAuthenticated, (req, res) => {
  res.render('new', { todoFormCSS: true, formValidation: true })
})

// create todo submit
router.post('/new', isAuthenticated, (req, res) => {
  console.log(req.body.detail)
  Todo.create({
    name: req.body.name,
    done: req.body.status === 'done',
    detail: req.body.detail,
    UserId: req.user.id
  })
    .then(todo => {
      console.log(todo)
      return res.redirect('/')
    })
    .catch(error => res.status(422).json(err))
})

// update todo page
router.get('/edit/:id', isAuthenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then(todo => res.render('edit', { todo, todoFormCSS: true, formValidation: true }))
})

// update todo submit
router.put('/edit/:id', isAuthenticated, (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then(todo => {
      todo.name = req.body.name
      todo.done = req.body.status === 'done'
      todo.detail = req.body.detail
      return todo.save()
    })
    // .then(todo => res.redirect(`/todos/edit/${req.params.id}`))
    .then(todo => res.redirect(`/`))
    .catch(error => res.status(422).json(error))
})

// delete todo 
router.delete('/delete/:id', isAuthenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => res.redirect('/'))
    .catch(error => res.status(422).json(error))
})

module.exports = router