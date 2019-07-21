const express = require('express')
const router = express.Router()
// Include isAuthenticated modules
const { isAuthenticated } = require('../config/auth')
// Include controller
const homeController = require('../controllers/home')

router.get('/', isAuthenticated, homeController.getHome)

module.exports = router