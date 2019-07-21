const express = require('express')
const router = express.Router()

// Include server-side validation
const validation = require('../express-validator')
// Include isAuthenticated module
const { isAuthenticated } = require('../config/auth')

// Include Controller
const todoController = require('../controllers/todo')

router.get('/', isAuthenticated, todoController.getViewAllTodo)

// show one todo
router.get('/view/:id', isAuthenticated, todoController.getViewOneTodo)

// create todo page
router.get('/new', isAuthenticated, todoController.getNewTodo)

// create todo submit
router.post('/new', isAuthenticated, validation.newTodo, todoController.postNewTodo)

// update todo page
router.get('/edit/:id', isAuthenticated, todoController.getEditTodo)

// update todo submit
router.put('/edit/:id', validation.editTodo, isAuthenticated, todoController.putEditTodo)

// delete todo 
router.delete('/delete/:id', isAuthenticated, todoController.deleteTodo)

module.exports = router