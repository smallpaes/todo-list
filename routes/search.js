const express = require('express')
const router = express.Router()
// Include isAuthenticated module
const { isAuthenticated } = require('../config/auth')
// Include controller
const searchController = require('../controllers/search')

router.get('/', isAuthenticated, searchController.getSearch)


module.exports = router