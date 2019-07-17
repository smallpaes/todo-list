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
router.get('/:id', isAuthenticated, (req, res) => {
  res.send('list one todo')
})

// create todo page
router.get('/new', isAuthenticated, (req, res) => {
  res.send('new todo page')
})

// create todo submit
router.post('/', isAuthenticated, (req, res) => {
  res.send('new todo submit')
})

// update todo page
router.get('/:id/edit', isAuthenticated, (req, res) => {
  res.send('edit page')
})

// update todo submit
router.put('/:id', isAuthenticated, (req, res) => {
  res.send('edit submit')
})

// delete todo 
router.delete('/:id/delete', isAuthenticated, (req, res) => {
  res.send('delete page')
})

module.exports = router